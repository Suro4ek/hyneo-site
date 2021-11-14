import {BsCartPlus} from "react-icons/all";
import {classNames, Item} from "../../api/API";
import {useToast} from "../Toast/ToastProvider";
import {cartItems, current_product, open_cardinfo} from "../../cache/cache";
const { v4: uuidv4 } = require('uuid');

const Card = ({item}:{item:Item}) =>{

    const toast = useToast();
        return (
            <div className="group transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl dar:hover:shadow-8xl rounded-2xl">
                    <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                        <img
                            src={item.img}
                            className="w-full h-full object-center object-cover"
                        />
                    </div>
                <div className="mr-1 ml-1">
                    <h3 className="mt-4 text-sm text-gray-700 dark:text-gray-200">{item.name}</h3>
                    <div className="flex space-x-2">
                        <p className="mt-1 text-lg font-medium text-gray-900 dark:text-gray-400 line-through">{item.discprice}р</p>
                        <p className="mt-1 text-lg font-medium text-gray-900 dark:text-gray-200">{item.price}р</p>
                    </div>
                    <div className="w-full mb-2 flex">
                        <button value="button"
                                className="bg-gray-700 text-base text-white px-4 py-2 rounded hover:bg-gray-900 mt-8 dark:hover:bg-gray-800"
                                onClick={() => {
                                    current_product(item);
                                    open_cardinfo(true);
                                }}
                        >Купить
                        </button>
                        <button
                            type="button"
                            className="px-4 py-2 bg-blue-600 rounded text-white mt-8 hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
                            onClick={() => {
                                const carts = cartItems();
                                if(carts.Cart.length >= 25){
                                    toast?.pushError("Корзина переполнена", 3000);
                                    return;
                                }
                                toast?.pushSuccess(item.name+` добавлен в корзину`, 3000);
                                cartItems({total_price: carts.total_price+item.price, Cart: [...carts.Cart, {item, count: 1, id: uuidv4()}]});
                                localStorage.setItem("cart", JSON.stringify(cartItems()));
                            }}
                        >
                            <span className="sr-only" >Добавить в корзину</span>
                                <BsCartPlus className={classNames("block h-6 w-6")}/>
                        </button>
                    </div>
                </div>
            </div>
   )
}

export default Card;