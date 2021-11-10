
import CartItem from "./CartItem";
import {Fragment} from "react";
import {useReactiveVar} from "@apollo/client";
import {Cart} from "../../api/API";
import {cartItems} from "../../cache/cache";

const CartsFeed = () => {

    const cartItem = useReactiveVar(cartItems);

    return(
        <Fragment>
            {cartItem.Cart.length === 0 ? <li className="py-6 flex text-gray-900 dark:text-gray-500">Корзина пуста</li> : cartItem.Cart.map((item:Cart, value:any) => (
                <CartItem key={value} product={item}/>
            ))}
        </Fragment>
    )
}

export default CartsFeed;