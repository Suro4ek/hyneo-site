import {getRepository} from "typeorm";
import {Category} from "../entity/Category";
import {Item} from "../entity/Item";
import {Promocode} from "../entity/Promocode";
import {P2P} from "qiwi-sdk";
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
        const repository = getRepository(Item);
        let discount = 0;
        const buy = args.buy;
        const promocode = await repository_promo.findOne({where: {name: buy.promo}});
        if(promocode){
            discount = promocode?.discount;
        }
        const carts = buy.Cart;
        const ids = [];
        let sum = 0;
        let desc = "";
        for(let i = 0; i < carts.length; i++){
            const item = carts[i].item[0];
            ids.push({id: item.id, count: carts[i].count});
        }
        const items = await repository.findByIds(ids);
        for(let i = 0; i < items.length; i++){
            desc += items[0].name+" ";
            sum += items[0].price*carts[i].count;
        }
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
            console.log(url);
            console.log(bill.payUrl)
            return url;
        }else if(buy.pay === 1){
            const secret_key = process.env.SECRET_KEY;
            console.log(desc);
            console.log(ids);
            const merchant_id = 1;
            const pay_id = 123123213;
            const arr = [merchant_id, '3123213', sum, desc, secret_key];
            const hesh = crypto.createHash("sha256");
            const sign = hesh.update(arr.join(":")).digest('base64');
            return `https://anypay.io/merchant?merchant_id=${merchant_id}&amount=${sum}&pay_id=${pay_id}&desc=${desc}&sign=${sign}`;
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