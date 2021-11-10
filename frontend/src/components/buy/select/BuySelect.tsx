import {RadioGroup} from "@headlessui/react";
import {BsFillCheckSquareFill} from "react-icons/all";
import {useState} from "react";
import {buy} from "../../../cache/cache";

const plans = [
    {
        id: 0,
        name: 'Qiwi',
    },
    {
        id: 1,
        name: 'AnyPay',
    },
]

const BuySelect = () => {
    const [selected, setSelected] = useState(plans[0])
    return(
        <RadioGroup value={selected} onChange={(e) => {
            buy({...buy(), pay: e.id})
            setSelected(e);
        }}>
            <RadioGroup.Label className="sr-only">Выбор платежки</RadioGroup.Label>
            <div className="space-y-2">
                {plans.map((plan) => (
                    <RadioGroup.Option
                        key={plan.id}
                        value={plan}
                        className={({ active, checked }) =>
                            `${
                                active
                                    ? 'ring-2 ring-offset-2 ring-offset-sky-300 ring-blue'
                                    : ''
                            }
                  ${
                                checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'bg-white'
                            }
                    relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none`
                        }
                    >
                        {({ active, checked }) => (
                            <>
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center">
                                        <div className="text-sm">
                                            <RadioGroup.Label
                                                as="p"
                                                className={`font-medium  ${
                                                    checked ? 'text-black' : 'text-gray-900'
                                                }`}
                                            >
                                                {plan.name}
                                            </RadioGroup.Label>
                                            <RadioGroup.Description
                                                as="span"
                                                className={`inline ${
                                                    checked ? 'text-black' : 'text-gray-500'
                                                }`}
                                            >
                                            </RadioGroup.Description>
                                        </div>
                                    </div>
                                    {checked && (
                                        <div className="flex-shrink-0 text-black">
                                            <BsFillCheckSquareFill  className="w-6 h-6"/>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </RadioGroup.Option>
                ))}
            </div>
        </RadioGroup>
    )
}

export default BuySelect;