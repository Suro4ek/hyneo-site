import {gql} from "@apollo/client";


const CHECK_PROMO = gql`
    mutation CheckPromo($name: String!) {
        checkPromo(name: $name) {
            discount
        }
    }
`

const BUY = gql`
    mutation Buy($buy: BuyInput!) {
        buy(buy: $buy)
    }
`


export {CHECK_PROMO, BUY};