import {useReactiveVar} from "@apollo/client";
import {buy} from "../../../cache/cache";

const BuyNickname = () => {
    const buy_form = useReactiveVar(buy);
    return(
        <input type="text" placeholder="Ник"
               value={buy_form.nickname}
               onChange={(e) => {
                   buy({...buy_form, nickname: e.target.value})
               }}
               className="mt-4 block w-full bg-gray-100 p-2 rounded-lg border-2 border-indigo-500 shadow-md focus:outline-none focus:border-indigo-600"/>
    )
}

export default BuyNickname;