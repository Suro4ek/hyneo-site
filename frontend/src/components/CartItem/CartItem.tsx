import {cartItems} from "../../cache/cache";
import {Cart} from "../../api/API";
import {useReactiveVar} from "@apollo/client";

const CartItem = ({product}:{product: Cart}) => {
    const cartItem = useReactiveVar(cartItems);
    return(
        <li className="py-6 flex">
            <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                <img
                    src={product.item.img}
                    alt={product.item.name}
                    className="w-full h-full object-center object-cover"
                />
            </div>

            <div className="ml-4 flex-1 flex flex-col">
                <div>
                    <div className="flex justify-between text-base font-medium text-gray-900 dark:text-gray-500">
                        <h3>
                            <a>{product.item.name}</a>
                        </h3>
                        <div>
                            <span className="line-through mr-2">{product.item.discprice}р</span>
                            <span className="text-gray-200">{product.item.price}р</span>
                        </div>
                    </div>
                </div>
                <div className="flex-1 flex items-end justify-between text-sm">
                    <p className="text-gray-500 dark:text-gray-600"/>

                    <div className="flex">
                        <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={() => {
                            const carts = cartItem;
                            cartItems({
                                total_price: carts.total_price - product.item.price,
                                Cart: carts.Cart.filter(value1 => value1.id !== product.id)});
                                localStorage.setItem("cart", JSON.stringify(cartItems()));
                                }}>
                            Удалить
                        </button>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default CartItem;