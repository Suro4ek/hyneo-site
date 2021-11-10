import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {AiOutlineClose} from "react-icons/all";
import CartsFeed from "../CartItem/CartsFeed";
import {buy, cartItems, open_buy} from "../../cache/cache";
import {useReactiveVar} from "@apollo/client";

const Cart = ({open, setOpen}:any) => {
    const cartItem = useReactiveVar(cartItems);
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={setOpen}>
                <div className="absolute inset-0 overflow-hidden">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                    </Transition.Child>

                    <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transform transition ease-in-out duration-500 sm:duration-700"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transform transition ease-in-out duration-500 sm:duration-700"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <div className="w-screen max-w-md">
                                <div
                                    className="h-full flex flex-col bg-white dark:bg-gray-900 shadow-xl overflow-y-scroll">
                                    <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                                        <div className="flex items-start justify-between">
                                            <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-gray-500">Корзина</Dialog.Title>
                                            <div className="ml-3 h-7 flex items-center">
                                                <button
                                                    type="button"
                                                    className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                                                    onClick={() => setOpen(false)}
                                                >
                                                    <span className="sr-only">Закрыть</span>
                                                    <AiOutlineClose className="h-6 w-6" aria-hidden="true"/>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mt-8">
                                            <div className="flow-root">
                                                <ul role="list" className="-my-6 divide-y divide-gray-200 dark:divide-gray-800">
                                                    <CartsFeed/>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 dark:border-gray-800 py-6 px-4 sm:px-6">
                                        <div className="flex justify-between text-base font-medium text-gray-900 dark:text-gray-500">
                                            <p>Сумма</p>
                                            <p>{cartItem.total_price}руб</p>
                                        </div>
                                        <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-600">
                                            Это посчитанная итоговая сумма</p>
                                        <div className="mt-6">
                                            <a
                                                href="#"
                                                className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                                onClick={() => {
                                                    setOpen(false)
                                                    buy({...buy(),Cart: [...cartItem.Cart]})
                                                    setTimeout(() => open_buy(true), 1000);
                                                }}
                                            >
                                                Оплатить
                                            </a>
                                        </div>
                                        <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                                            <p>
                                                или{' '}
                                                <button
                                                    type="button"
                                                    className="text-indigo-600 font-medium hover:text-indigo-500"
                                                    onClick={() => setOpen(false)}
                                                >
                                                    Продолжить покупку<span aria-hidden="true"> &rarr;</span>
                                                </button>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

export default Cart;