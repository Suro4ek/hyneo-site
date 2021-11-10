import {makeAutoObservable} from "mobx";
import {Item} from "../api/API";

interface Lists{
    name: string,
    current: boolean,
    items?: Item[]
}

class Goods{
    goods:Lists[] = [
        { name: 'Creative+', current: true, items:
            [
                {id: 0, name: 'Bronze', price: 10, desc: 'ЭТо бронза ЭТо бронзаЭТо бронза ЭТо бронзаЭТо бронза\n ЭТо бронзаЭТо бронзаЭТо бронзаЭТо бронзаЭТо бронзаЭТо бронза' +
                        'ЭТо бронза ЭТо бронзаЭТо бронза ЭТо бронзаЭТо бронза\n ЭТо бронзаЭТо бронзаЭТо бронзаЭТо бронзаЭТо бронзаЭТо бронза' +
                        'ЭТо бронза ЭТо бронзаЭТо бронза ЭТо бронзаЭТо бронза\n ЭТо бронзаЭТо бронзаЭТо бронзаЭТо бронзаЭТо бронзаЭТо бронза' +
                        'ЭТо бронза ЭТо бронзаЭТо бронза ЭТо бронзаЭТо бронза\n ЭТо бронзаЭТо бронзаЭТо бронзаЭТо бронзаЭТо бронзаЭТо бронза' +
                        'ЭТо бронза ЭТо бронзаЭТо бронза ЭТо бронзаЭТо бронза\n ЭТо бронзаЭТо бронзаЭТо бронзаЭТо бронзаЭТо бронзаЭТо бронза' +
                        'ЭТо бронза ЭТо бронзаЭТо бронза ЭТо бронзаЭТо бронза\n ЭТо бронзаЭТо бронзаЭТо бронзаЭТо бронзаЭТо бронзаЭТо бронза' +
                        'ЭТо бронза ЭТо бронзаЭТо бронза ЭТо бронзаЭТо бронза\n ЭТо бронзаЭТо бронзаЭТо бронзаЭТо бронзаЭТо бронзаЭТо бронза' +
                        'ЭТо бронза ЭТо бронзаЭТо бронза ЭТо бронзаЭТо бронза\n ЭТо бронзаЭТо бронзаЭТо бронзаЭТо бронзаЭТо бронзаЭТо бронза' +
                        'ЭТо бронза ЭТо бронзаЭТо бронза ЭТо бронзаЭТо бронза\n ЭТо бронзаЭТо бронзаЭТо бронзаЭТо бронзаЭТо бронзаЭТо бронза', img: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg'},
                {id: 1, name: 'sd', price: 10, desc: 'ЭТо бронза', img: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg'},
                {id: 3, name: 'Bronze', price: 10, desc: 'ЭТо бронза', img: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg'},
                {id: 4, name: 'sd', price: 10, desc: 'ЭТо бронза', img: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg'},
                {id: 5, name: 'Bronze', price: 10, desc: 'ЭТо бронза', img: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg'},
                {id: 6, name: 'sd', price: 10, desc: 'ЭТо бронза', img: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg'},
                {id: 7, name: 'Bronze', price: 10, desc: 'ЭТо бронза', img: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg'},
                {id: 8, name: 'sd', price: 10, desc: 'ЭТо бронза', img: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg'},

            ]},
        { name: 'Титулы',  current: false ,items:
                [ {id: 0, name: 'Bronze', price: 10, desc: 'ЭТо бронза', img: ''}]},
        { name: 'Разное', current: false, items:
                [ {id: 0, name: 'Bronze', price: 10, desc: 'ЭТо бронза',  img: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg'}]},]
    openedProduct:Item | null  = null;
    dark = false;
    constructor() {
        makeAutoObservable(this)
    }

    setOpenedProduct(item: Item){
        this.openedProduct = item;
    }

    reloadCurrent(name:string){
        let newGoods = []

    }


}

export default new Goods();