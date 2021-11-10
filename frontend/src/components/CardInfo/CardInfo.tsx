import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {Item} from "../../api/API";
import {AiOutlineClose} from "react-icons/all";
import {useReactiveVar} from "@apollo/client";
import {buy, current_product, open_buy, open_cardinfo} from "../../cache/cache";
const { v4: uuidv4 } = require('uuid');


const CardInfo =( ) => {
    const open = useReactiveVar(open_cardinfo);
    const item:Item | null = useReactiveVar(current_product);
    if(item === null){
        open_cardinfo(false);
    }
    const close = () =>{
        current_product(null);
    }
    return(
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={() => {
                open_cardinfo(false);
                close();
            }}>
                <div className="flex min-h-screen text-center md:block md:px-2 lg:px-4" style={{ fontSize: 0 }}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="hidden fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity md:block" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden md:inline-block md:align-middle md:h-screen" aria-hidden="true">
            &#8203;
          </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                        enterTo="opacity-100 translate-y-0 md:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 md:scale-100"
                        leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                    >
                        <div className="flex text-base text-left transform transition w-full md:inline-block md:max-w-2xl md:px-4 md:my-8 md:align-middle lg:max-w-4xl">
                            <div className="w-full relative flex items-center bg-white px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                                <button
                                    type="button"
                                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                                    onClick={() => {
                                        open_cardinfo(false);
                                        close();
                                    }}
                                >
                                    <span className="sr-only">Закрыть</span>
                                    <AiOutlineClose className="h-6 w-6" aria-hidden="true"/>
                                </button>

                                <div className="w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8">
                                    <div className="aspect-w-2 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden sm:col-span-4 lg:col-span-5">
                                        <img src={item?.img} alt={item?.name} className="object-center object-cover" />
                                    </div>
                                    <div className="sm:col-span-8 lg:col-span-7">
                                        <h2 className="text-2xl font-extrabold text-gray-900 sm:pr-12">{item?.name}</h2>

                                        <section aria-labelledby="options-heading" className="mt-10">
                                            <h3 id="options-heading" className="sr-only">
                                                Информация
                                            </h3>

                                                <div>
                                                    Описание
                                                    <div>
                                                        {item?.desc}
                                                    </div>
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="mt-6 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                    onClick={()=> {
                                                        open_cardinfo(false);
                                                        if(item !== null){
                                                            buy({...buy(),Cart: [{id: uuidv4(), count:1, item: item!}]})
                                                            setTimeout(() => open_buy(true), 500);
                                                        }
                                                    }}
                                                >
                                                    Далее
                                                </button>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default CardInfo;