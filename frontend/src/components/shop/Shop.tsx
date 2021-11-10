import Categories from "../categories/Categories";
import CardInfo from "../CardInfo/CardInfo";
import Buy from "../buy/Buy";
import Cards from "./Cards";

const Shop = () => {
    return(
        <div>
            <Buy/>
            <CardInfo />
            <div className="bg-gray-100 dark:bg-gray-900 min-h-screen max-h-full">
                <Categories/>
                <main className="mt-2 mx-auto max-w-7xl px-4 sm:mt-2 sm:px-6 md:mt-2 lg:mt-2 lg:px-8 xl:mt-2">
                    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                            <Cards />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Shop;