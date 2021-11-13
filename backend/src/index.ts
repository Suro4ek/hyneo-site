import path from "path";

const express = require('express');
const {ApolloServer} = require('apollo-server-express');
const cors = require('cors');
import "reflect-metadata";
require('dotenv').config();
import {createConnection, getRepository} from "typeorm";
import crypto from "crypto";
import {Pay} from "./entity/Pay";
import {Item} from "./entity/Item";

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const port = process.env.PORT || 4000;

const app = express();

const connection = createConnection();

connection.then(() => {
    console.log("Connected")
})


async function startApolloServer() {
    // Same ApolloServer initialization as before
    const server = new ApolloServer({ typeDefs, resolvers});

    // Required logic for integrating with Express
    await server.start();

    server.applyMiddleware({app, path: '/api'});

    // Modified server startup
    await new Promise(resolve => app.listen({ port }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}
startApolloServer().then(r => {

});
app.use(cors());
app.use(express.static(path.resolve(__dirname,'../../frontend/build')));
app.use('/any_result', async (req: any, res: any) => {
    const pay_id = req.query.pay_id;
    const repository = getRepository(Item);
    const repository_pay = getRepository(Pay);
    console.log(req.query);
    const payment = await repository_pay.findOne({where: {id: pay_id}});
    if(payment){
        const items: Item[] = JSON.parse(payment.items);
        const ids = [];
        let sum = 0;
        let desc = "";
        for(let i = 0; i < items.length; i++){
            const item = items[i];
            ids.push({id: item.id});
        }
        const items1 = await repository.findByIds(ids);1
        for(let i = 0; i < items.length; i++){
            const item = items[i];
            items1.forEach(value => {
                if(value.id === item.id){
                    desc += value.name+" ";
                    sum += value.price;
                }
            })
        }
        const secret_key = process.env.SECRET_KEY;
        const arr = [process.env.PROJECT_ID,sum,pay_id,secret_key];
        const hesh = crypto.createHash("md5");
        const sign = hesh.update(arr.join(":")).digest('hex');
        if(sign !== req.query.sign){
            res.json({error: "Не вверная подпись"});
            return;
        }
        res.json({message: 'OK'});
    }else{
        res.json({error: "Не найден счет"});
    }

})
