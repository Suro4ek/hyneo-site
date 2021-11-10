import {useMutation, useReactiveVar} from "@apollo/client";
import {CHECK_PROMO} from "../../../gql/mutation";
import {buy} from "../../../cache/cache";

const BuyPromo = () => {
    const buy_form = useReactiveVar(buy);
    const [promo] = useMutation(CHECK_PROMO, {variables: {name: buy_form.promo}, onCompleted: data => {
            if(data.checkPromo.discount === 0){
                document.getElementById("buyasdasd")!.classList.remove("border-indigo-500")
                document.getElementById("buyasdasd")!.classList.add("border-red-500")
            }else{
                document.getElementById("buyasdasd")!.classList.add("border-indigo-500")
                document.getElementById("buyasdasd")!.classList.remove("border-red-500")
            }
        }});
    return(
        <div className="mt-2 relative rounded-md shadow-sm flex">
            <input type="text" placeholder="Промокод" id={"buyasdasd"}
                   className="block bg-gray-100 p-2 rounded-lg border-2 border-indigo-500 shadow-md focus:outline-none focus:border-indigo-600"
                   value={buy_form.promo}
                   onChange={(e) => {
                      buy({...buy_form, promo: e.target.value})
                   }}
            />
            <button
                type="submit"
                className="ml-2 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={(e)=> {
                    e.preventDefault();
                    promo();
                }}
            >
                Прорерить
            </button>
        </div>
    )
}

export default BuyPromo;