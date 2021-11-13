import {makeVar, ReactiveVar} from "@apollo/client";
import {Banner, Buy, CartNode, Item} from "../api/API"
let def = {total_price: 0, Cart: []}

if( localStorage.getItem("cart") !== null) {
    try {
        def = JSON.parse(localStorage.getItem("cart")!);
    }catch (e){
        localStorage.removeItem("cart");
    }
}


export const cartItems: ReactiveVar<CartNode> = makeVar<CartNode>(def);
export const darkTheme: ReactiveVar<boolean> = makeVar<boolean>(false);
export const current: ReactiveVar<number> = makeVar<number>(0);
export const current_product: ReactiveVar<Item | null> = makeVar<Item | null>(null);
export const open_cardinfo: ReactiveVar<boolean> = makeVar<boolean>(false);
export const open_buy: ReactiveVar<boolean> = makeVar<boolean>(false);
export const buy: ReactiveVar<Buy> = makeVar<Buy>({pay: 0, Cart: [], nickname: "", promo: ""});
export const banner: ReactiveVar<Banner> = makeVar<Banner>({show: false, message:""});