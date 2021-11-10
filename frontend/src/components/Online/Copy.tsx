import {copyTextToClipboard} from "../../util/Clipboard";
import {useToast} from "../Toast/ToastProvider";
import Online from "./Online";

const Copy = () => {

    const toast = useToast();

    return(
        <div className="hidden sm:block sm:ml-6 mr-2 text-green-600 cursor-pointer" onClick={() =>
        {
            copyTextToClipboard('mc.hyneo.ru')
            toast?.pushSuccess("Скопировано", 3000)
        }}>
            mc.hyneo.ru <Online/>
        </div>
    )
}

export default Copy;