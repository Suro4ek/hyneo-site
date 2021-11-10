import {makeAutoObservable} from "mobx";

class Bannersto {
    show = false;
    message = ""
    constructor() {
        makeAutoObservable(this)
    }

}

export default new Bannersto();