import {getRepository} from "typeorm";
import {Category} from "../entity/Category";
import {Item} from "../entity/Item";
import {Promocode} from "../entity/Promocode";
import {P2P} from "qiwi-sdk";
import {Pay, Process_Pay} from "../entity/Pay";

const crypto = require("crypto");
const path = require('path')

const p2p = new P2P(process.env.QIWI_SECRET_KEY!, process.env.QIWI_PUBLIC_KEY!);
module.exports = {
    newCategories: async (parent:any, args:any) => {
        const category_repository = getRepository(Category);
        const category = new Category();
        category.name = args.name;
        category.current = args.current;
        category.items = new Array<Item>();
        return await category_repository.save(category);
    },
    newItem: async (parent:any, args:any) => {
        const repository = getRepository(Item);
        const item = new Item();
        item.name = args.name;
        item.price = args.price;
        item.desc = args.desc;
        item.img = args.img ? args.img : "";
        return await repository.save(item);
    },
    newPromo: async (parent:any, args:any) => {
      const repository = getRepository(Promocode)
      const promocode = new Promocode();
      promocode.name = args.name;
      promocode.discount = args.discount;
      return await repository.save(promocode);
    },
    checkPromo: async (parent: any, args: any) => {
        const repository = getRepository(Promocode);
        const promocode = await repository.findOne({where: {name: args.name}});
        if(!promocode){
            return {discount: 0}
        }else{
            return {discount: promocode?.discount}
        }
    },
    buy: async (parent: any, args: any) => {
        const repository_promo = getRepository(Promocode);
        const repository_pay = getRepository(Pay);
        const payment = new Pay();
        payment.created_at=new Date();
        payment.updated_at=new Date();
        const repository = getRepository(Item);
        let discount = 0;
        const buy = args.buy;
        const promocode = await repository_promo.findOne({where: {name: buy.promo}});
        if(promocode){
            discount = promocode?.discount;
            payment.promocode = promocode;
        }
        const carts = buy.Cart;
        const ids = [];
        let sum = 0;
        let desc = "";
        for(let i = 0; i < carts.length; i++){
            const item = carts[i].item[0];
            ids.push({id: item.id});
        }
        const items = await repository.findByIds(ids);
        const newitems:Item[] = [];
        for(let i = 0; i < carts.length; i++){
            const item = carts[i].item[0];
            items.forEach(value => {
                if(value.id === parseInt(item.id)){
                    desc += value.name+" ";
                    sum += value.price;
                    newitems.push(value);
                }
            })
        }
        payment.nickname = buy.nickname;
        payment.items=JSON.stringify(Object.assign({}, newitems));
        // payment.items=newitems;
        payment.process=Process_Pay.IN_PROCCESS;
        const payment1 = await repository_pay.save(payment);
        desc += "на ник "+buy.nickname;
        if(buy.pay === 0){
            const bill =  await p2p.createBill({
                amount: {
                    value: sum,
                    currency: P2P.Currency.RUB
                },
                expirationDateTime: P2P.formatLifetime(2 /* 2 дня */),
                comment: desc
            });
            const url = P2P.patchPayUrl(bill.payUrl, {
                successUrl: `https://localhost:400/success`,
                paySource: P2P.PaySource.Card
            });
            return url;
        }else if(buy.pay === 1){
            const secret_key = process.env.SECRET_KEY;
            const pay_id = payment1.id;
            const currency = "RUB";
            const arr = [currency,sum, secret_key, process.env.PROJECT_ID, pay_id];
            const hesh = crypto.createHash("md5");
            const sign = hesh.update(arr.join(":")).digest('hex');
            return `https://anypay.io/merchant?merchant_id=${process.env.PROJECT_ID}&amount=${sum}&currency=${currency}&pay_id=${pay_id}&desc=${desc}&sign=${sign}`;
        }else{
            new Error("sdasdasd");
        }
    },
    addItemToCategory: async (parent:any, {category_id, item_id}:any) => {
        const category_repository = getRepository(Category);
        const item_repository = getRepository(Item);
        const category = await category_repository.findOne({where: {id: category_id}, relations: ["items"]});
        const item = await item_repository.findOne({where: { id: item_id} });
        if(!category || !item){
            return new Error("No category/Item");
        }
        category.items.push(item);
        return await category_repository.save(category);
    }
}