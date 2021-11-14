import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Shop from "../components/shop/Shop";
import Page404 from "./Page404"
import Header from "../components/header/Header";
import Banner from "../components/Banner/Banner";
import React, {useState} from "react";
import Cart from "../components/cart/Cart";
import Footer from "../components/footer/Footer";
import Offer from "./Offer";
import Privacy from "./privacy";

const Pages = () => {

    const [open, setOpen] = useState(false)

    const setOpens = (s:boolean) =>{
        setOpen(s);
    }

    return(
        <Router>
            <Header setOpen={setOpens}/>
            <Banner/>
            <Routes>
                <Route path={"/"} element={<Shop/>}/>
                <Route path="/offer" element={<Offer/>}/>'
                <Route path="/privacy" element={<Privacy/>}/>
                <Route path="*" element={<Page404/>}/>
            </Routes>
            <Cart open={open} setOpen={setOpens}/>
            <Footer/>
        </Router>
    )
}

export default Pages;