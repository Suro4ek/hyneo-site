import {useQuery} from "@apollo/client";
import {GET_ONLINE} from "../../gql/query";

const Online = () => {
    const {data, loading} = useQuery(GET_ONLINE);
    if(loading) return <span className="text-yellow-500">0</span>;
    return (
        <span className="text-yellow-500">{data?.minecraft.onlinePlayers}</span>
    )
}

export default Online;