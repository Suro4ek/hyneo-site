import {useQuery, useReactiveVar} from "@apollo/client";
import {GET_CATEGORY} from "../../gql/query";
import React from "react";
import Card from "../Card/Card";
import {current} from "../../cache/cache";

const Cards = () => {

    const {data, loading, error, fetchMore} = useQuery(GET_CATEGORY);

    const curren = useReactiveVar(current);

    if(loading) return <div className="flex justify-center items-center text-gray-400">Загрузка..</div>;

    if(error) return <div className="flex justify-center items-center text-gray-400">Попробуйте запустить сайт позже</div>;
    return(
        <React.Fragment>
            {data.category[curren].items!.map((value: {
                id: number,
                name: string,
                price: number,
                desc: string,
                img: string,
                discprice: number
            }) => (
                <Card key={value.id} item={value}/>
            ))}
        </React.Fragment>
    )
}

export default Cards;