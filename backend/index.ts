const express = require('express');
const {ApolloServer} = require('apollo-server-express');
const cors = require('cors');
import "reflect-metadata";
require('dotenv').config();
import {createConnection} from "typeorm";

const typeDefs = require('./src/schema');
const resolvers = require('./src/resolvers');

const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

const app = express();

const connection = createConnection();

connection.then(value => {
    console.log("Connected")
})

app.use(cors());
async function startApolloServer() {
    // Same ApolloServer initialization as before
    const server = new ApolloServer({ typeDefs, resolvers});

    // Required logic for integrating with Express
    await server.start();

    const app = express();

    server.applyMiddleware({app, path: '/api'});

    // Modified server startup
    await new Promise(resolve => app.listen({ port }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}
startApolloServer().then(r => {

});