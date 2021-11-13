import {useReactiveVar} from "@apollo/client";
import {FiSun, RiMoonLine} from "react-icons/all";
import {useToast} from "../Toast/ToastProvider";
import {darkTheme} from "../../cache/cache";

const DarkSwitch =() => {
        const toast = useToast();
        const dark = useReactiveVar(darkTheme);
        if(dark){
            localStorage.theme = 'dark';
            document.documentElement.classList.add('dark');
        }else{
            localStorage.theme = 'white';
            document.documentElement.classList.remove('dark');
        }

        return (
            <div>
                {
                    !dark ?  <FiSun className="relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer text-gray-400" onClick={() => {
                     darkTheme(true);
                     toast?.pushInfo("Вы переключили тему сайта на темную")
                    }
                        }/> :
                        <RiMoonLine className="relative inline-flex items-center h-6 rounded-full w-11 cursor-pointer text-gray-400"
                        onClick={() => {
                            darkTheme(false);
                            toast?.pushInfo("Вы переключили тему сайта на белую")
                        }
                        }/>
                }
            </div>
        )
}

export default DarkSwitch;