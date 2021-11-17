import { Disclosure } from '@headlessui/react'
import DarkSwitch from "../darkswitch/DarkSwitch";
import { BiCartAlt } from "react-icons/bi";
import {AiOutlineClose, AiOutlineMenu} from "react-icons/all";
import {classNames} from "../../api/API";
import Copy from "../Online/Copy";
import {Link} from "react-router-dom";
import {useState} from "react";
import {buy, cartItems} from "../../cache/cache";
import {useReactiveVar} from "@apollo/client";

const Header = ({setOpen}:any) => {
    const carts1 = useReactiveVar(cartItems);
    const [navigation, setNavigation] = useState([
        { name: 'Донат', to: '/' },
        { name: 'Банлист', to: 'https://ban.hyneo.ru/'},
        { name: 'Wiki', to: 'https://wiki.hyneo.ru/'},
        { name: 'Правила', to: 'https://wiki.hyneo.ru/p/1'},
    ]);
    return (
        <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
                <>
                    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                        <div className="relative flex items-center justify-between h-16">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Открыть главное меню</span>
                                    {open ? (
                                        <AiOutlineClose/>
                                    ) : (
                                    <AiOutlineMenu/>
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                                <Link to="/">
                                    <div className="flex-shrink-0 flex items-center text-green-600 text-2xl cursor-pointer">
                                        HyNeo
                                    </div>
                                </Link>
                                <div className="hidden sm:block sm:ml-6">
                                    <div className="flex space-x-4">
                                        {navigation.map((item, value) => (
                                            <a
                                                key={value}
                                                href={item.to}
                                                className={classNames('text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'px-3 py-2 rounded-md text-sm font-medium'
                                                )}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <Copy/>
                                <button
                                    type="button"
                                    className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none"
                                    onClick={() => setOpen(true)}
                                >
                                    <span className="sr-only" >Корзина</span>
                                    <div className="relative h-7 w-7">
                                        <BiCartAlt className="h-7 w-7"/>
                                        <div className="absolute block -top-2 px-1 py-0.5 -right-2 bg-yellow-300 text-black rounded-3xl text-xs">{carts1.Cart.length}</div>
                                    </div>
                                </button>

                                <DarkSwitch/>

                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navigation.map((item, value) => (
                                <a
                                      key={value}
                                      href={item.to}
                                      className={classNames(
                                          'text-gray-300 hover:bg-gray-700 hover:text-white',
                                          'block px-3 py-2 rounded-md text-base font-medium'
                                      )}
                                > {item.name}</a>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}

        </Disclosure>
    )
}

export default Header;