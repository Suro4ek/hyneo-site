
import {Link} from "react-router-dom";
import {FaDiscord, FaInstagram, FaVk, FaYoutube} from "react-icons/all";
const Footer = () => {
    return (
        <div className="">
            <footer id="footer" className="relative z-50 dark:bg-gray-900 pt-24">
                <div className="border-t border-b border-gray-200 dark:border-gray-700 py-16">
                    <div className="mx-auto container px-4 xl:px-12 2xl:px-4">
                        <div className="lg:flex">
                            <div className="w-full lg:w-1/2 mb-16 lg:mb-0 flex">
                                <div className="w-full lg:w-1/2 px-6">
                                    <ul>
                                        <li>
                                            <Link to="/privacy">
                                                <a className="text-xs lg:text-sm leading-none hover:text-brand dark:hover:text-brand text-gray-800 dark:text-gray-50">Политики конфидициальности</a>
                                            </Link>
                                        </li>
                                        <li className="mt-6">
                                            <Link to="/offer">
                                                <a className="text-xs lg:text-sm leading-none hover:text-brand dark:hover:text-brand text-gray-800 dark:text-gray-50">Договор публичной оферты</a>
                                            </Link>
                                        </li>
                                        <li className="mt-6">
                                            <a href="https://stats.uptimerobot.com/GXZ0nhJx46">
                                                <a className="text-xs lg:text-sm leading-none hover:text-brand dark:hover:text-brand text-gray-800 dark:text-gray-50">Статус серверов</a>
                                            </a>
                                        </li>
                                        <li className="mt-6">
                                            <Link to="javascript:void(0)">
                                                <a className="text-xs lg:text-sm leading-none hover:text-brand dark:hover:text-brand text-gray-800 dark:text-gray-50">Помощь</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="w-full lg:w-1/2 px-6">
                                    <ul>
                                        <li className="text-xs lg:text-sm leading-none hover:text-brand dark:hover:text-brand text-gray-800 dark:text-gray-50">Голосуй за нас</li>
                                    </ul>
                                    <ul>

                                    </ul>
                                </div>
                            </div>
                            <div className="w-full lg:w-1/2 flex">
                                <div className="w-full lg:w-1/2 px-6">
                                    <ul>
                                        <li>
                                            <a href="https://stats.uptimerobot.com/GXZ0nhJx46" className="text-xs lg:text-sm leading-none hover:text-brand dark:hover:text-brand text-gray-800 dark:text-gray-50">
                                               Что то будет
                                            </a>
                                        </li>

                                    </ul>
                                </div>
                                <div className="w-full lg:w-1/2 px-6 flex flex-col justify-between">
                                    <div className="flex items-center mb-6">
                                        <a href="https://discord.com/invite/qv8vFfM" target="_blank">
                                            <div className="text-gray-800 dark:text-gray-50 cursor-pointer hover:text-brand dark:hover:text-brand ">
                                                <FaDiscord className="h-8 w-8"/>
                                            </div>
                                        </a>
                                        <a href="https://vk.com/hyneo" target="_blank">
                                            <div className="pl-4 text-gray-800 dark:text-gray-50 cursor-pointer hover:text-brand dark:hover:text-brand ">
                                                <FaVk className="h-8 w-8"/>
                                            </div>
                                        </a>
                                        <a href="https://www.instagram.com/hyneonetwork/" target="_blank">
                                            <div className="pl-4 text-gray-800 dark:text-gray-50 cursor-pointer hover:text-brand dark:hover:text-brand ">
                                                <FaInstagram className="h-8 w-8"/>
                                            </div>
                                        </a>
                                        <a href="https://www.youtube.com/c/HyNeoNetwork" target="_blank">
                                            <div className="pl-4 text-gray-800 dark:text-gray-50 cursor-pointer hover:text-brand dark:hover:text-brand ">
                                                <FaYoutube className="h-8 w-8"/>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-16 flex flex-col justify-center items-center">
                    <img alt="HyNeo Logo" src="/img/logo.png" className="w-24 h-24"/>
                    <p className="mt-6 text-xs lg:text-sm leading-none text-gray-900 dark:text-gray-50">2021 HyNeo Network©. Все права защищены.</p>
                </div>
            </footer>
        </div>
    );
};
export default Footer;
