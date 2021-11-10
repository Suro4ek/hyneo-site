import {classNames} from "../../api/API";
import BannerStore from "../../store/Bannersto";
import {observer} from "mobx-react-lite";
import Bannerstore from "../../store/Bannersto";
import {AiOutlineClose, GrAnnounce} from "react-icons/all";

const Banner = observer(() => {

    return(
        <div className={classNames("bg-indigo-600", BannerStore.show ? '' : 'hidden')}>
            <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between flex-wrap">
                    <div className="w-0 flex-1 flex items-center">
            <span className="flex p-2 rounded-lg bg-indigo-800">
                <GrAnnounce/>
            </span>
                        <p className="ml-3 font-medium text-white truncate">
                            <span className="">{BannerStore.message}</span>
                        </p>
                    </div>
                    <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
                        <button
                            type="button"
                            className="-mr-1 flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
                            onClick={() => {
                                Bannerstore.show = false;
                                Bannerstore.message = ""
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
})

export default Banner;