import {Dialog, Transition} from "@headlessui/react";
import {Fragment} from "react";
import {Item, submitPostForm} from "../../api/API";
import {AiOutlineClose} from "react-icons/all";
import {useMutation, useReactiveVar} from "@apollo/client";
import {buy, current_product, open_buy} from "../../cache/cache";
import BuySelect from "./select/BuySelect";
import BuyPromo from "./promo/BuyPromo";
import BuyNickname from "./nickname/BuyNickanme";
import {BUY} from "../../gql/mutation";


const Buy = () => {
    const open = useReactiveVar(open_buy);
    const item:Item | null = useReactiveVar(current_product);

    const close = () =>{
        current_product(null);
    }

    const [buy1] = useMutation(BUY, {onCompleted: data => {
            const s:String = data.buy;
            if(s.startsWith("https://oplata.qiwi.com")){
                window.location.href = data.buy;
            }else{
                submitPostForm(data.buy);
            }

        },
        onError: error => {
                console.log(error);
        }});


    const omitDeepArrayWalk = (arr:any, key:any) => {
        return arr.map((val:any) => {
            if (Array.isArray(val)) return omitDeepArrayWalk(val, key);
            else if (typeof val === "object") return omitDeep(val, key);
            return val;
        });
    };

    const omitDeep = (obj:any, key:any) => {
        const keys = Object.keys(obj);
        const newObj:any = {};
        keys.forEach(i => {
            if (i !== key) {
                const val = obj[i];
                if (val instanceof Date) newObj[i] = val;
                else if (Array.isArray(val)) newObj[i] = omitDeepArrayWalk(val, key);
                else if (typeof val === "object" && val !== null)
                    newObj[i] = omitDeep(val, key);
                else newObj[i] = val;
            }
        });
        return newObj;
    };


    return (
    <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={() => {
            open_buy(false);
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
                    <div className="flex text-base text-left transform transition w-full md:inline-block md:max-w-2xl md:px-4 md:my-8 md:align-middle lg:max-w-2xl">
                        <div className="w-full relative flex items-center bg-white px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                            <button
                                type="button"
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                                onClick={() => {
                                    open_buy(false);
                                    close();
                                }}
                            >
                                <span className="sr-only">Закрыть</span>
                                <AiOutlineClose className="h-6 w-6" aria-hidden="true"/>
                            </button>

                            <div className="w-full gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8">
                                <div className="sm:col-span-8 lg:col-span-7">
                                    <h2 className="text-2xl font-extrabold text-gray-900 sm:pr-12">Форма оплаты</h2>
                                    <section aria-labelledby="options-heading" className="mt-10">
                                        <form onSubmit={(e) => {
                                            e.preventDefault();
                                            buy1({variables: {buy: omitDeep(buy(), "__typename")}})
                                        }}>
                                            <BuySelect/>
                                            <BuyNickname/>
                                            <BuyPromo/>
                                            <button
                                                type="submit"
                                                className="mt-6 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                onClick={(event)=> {
                                                    // const button = (event.target as any);
                                                    // button.disabled = true;
                                                }}
                                            >
                                                Купить
                                            </button>
                                        </form>
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



export default Buy;