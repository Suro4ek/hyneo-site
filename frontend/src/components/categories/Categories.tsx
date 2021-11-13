import Tab from "./Tab";
import {useQuery, useReactiveVar} from "@apollo/client";
import {GET_CATEGORY} from "../../gql/query";
import React from "react";
import {current} from "../../cache/cache";

const Categories = () => {
    const {data, loading, error} = useQuery(GET_CATEGORY);
    const curren = useReactiveVar(current);

    if(loading) return <div className="flex justify-center items-center text-gray-400">Загрузка..</div>;

    if(error) return <div className="flex justify-center items-center text-gray-400">Попробуйте запустить сайт позже</div>;

    const onClick = (value:any) => {
        current(value);
    }

    return(
        <ul className="flex justify-center items-center">
            {data.category.map((item:any, value:any) =>(
                <Tab key={item.id} id={value} name={item.name} current={value === curren} onClick={onClick}/>
            ))}
        </ul>
    )
}

export default Categories;