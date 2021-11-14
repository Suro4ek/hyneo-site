import {gql} from "@apollo/client";

const GET_CATEGORY = gql`
    query Category {
        category {
            id
            name
            current
            items{
                id
                name
                price
                desc
                img
                discprice
            }
        }
    }
`

const GET_ONLINE = gql`
    query Minecraft {
        minecraft {
            onlinePlayers
        }
    }
`


export {GET_CATEGORY, GET_ONLINE}