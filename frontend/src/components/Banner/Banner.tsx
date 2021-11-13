import {classNames} from "../../api/API";
import {AiOutlineClose, GrAnnounce} from "react-icons/all";
import {useReactiveVar} from "@apollo/client";
import {banner} from "../../cache/cache";

const Banner =() => {

    const banne = useReactiveVar(banner);
    return(
        <div className={classNames("bg-indigo-600", banne.show ? '' : 'hidden')}>
            <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between flex-wrap">
                    <div className="w-0 flex-1 flex items-center">
            <span className="flex p-2 rounded-lg bg-indigo-800">
                <GrAnnounce/>
            </span>
                        <p className="ml-3 font-medium text-white truncate">
                            <span className="">{banne.message}</span>
                        </p>
                    </div>
                    <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
                        <button
                            type="button"
                            className="-mr-1 flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
                            onClick={() => {
                                banner({show: false, message: ""})
                            }}
                        >
                            <span className="sr-only">Dismiss</span>
                            <AiOutlineClose className="h-6 w-6" aria-hidden="true"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner;