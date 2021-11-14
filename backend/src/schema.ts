const { gql } = require('apollo-server-express');

module.exports = gql`
    type Item{
        id: ID!
        name: String!
        price: Int!
        desc: String!
        img: String
        discprice: Int!
    }

    type Category{
        id: ID!
        name: String!
        current: Boolean!
        items: [Item]!
    }
    
    type PromoCode{
        discount: Int!
    }
    
    type Minecraft{
        host: String!
        port: Int!
        version: String!
        protocolVersion: Int!
        onlinePlayers: Int!
        maxPlayers: Int!
    }
    
    type Cart{
        id: ID!
        item: [Item!]!
        count: Int!
    }
    
    type Buy{
        promo: String!
        nickname: String!
        pay: Int!
        Cart: [Cart!]!
    }

    type Query{
        items: [Item!]!
        category: [Category!]!
        minecraft: Minecraft
    }
    
    input ItemInput{
        id: ID!
        name: String!
        price: Int!
        desc: String!
        img: String
        discprice: Int!
    }
    
    input CartInput{
        id: ID!
        item: [ItemInput!]!
        count: Int!
    }
    
    input BuyInput{
        promo: String!
        nickname: String!
        pay: Int!
        Cart: [CartInput!]!
    }

    type Mutation{
        newCategories(name: String! current: Boolean!): Category
        newItem(name: String! price: Int! desc: String! img: String): Item
        newPromo(name: String! discount: Int!): PromoCode
        checkPromo(name: String!): PromoCode
        buy(buy: BuyInput!): String!
        addItemToCategory(category_id: ID! item_id: ID!): Category
    }
`;