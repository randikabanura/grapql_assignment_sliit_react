const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const isAuth = require('./middleware/is-auth');

const graphQlSchema = require('./graphql/schema/index.js');
const graphQlResolver = require('./graphql/resolvers/index.js')

const app = express();

app.use(bodyParser.json());

app.use(isAuth);

app.use('/graphql',
    graphqlHttp({
        schema: graphQlSchema,
        rootValue: graphQlResolver,
        graphiql: true
    }))

mongoose.connect(`mongodb+srv://admin:admin@clustertest-fyroa.mongodb.net/AF?retryWrites=true&w=majority`, { useNewUrlParser: true, useFindAndModify: false })
    .then(() => {
        app.listen(3000, () => {
            console.log("Database connected and Server started at port 3000")
        });
    }).catch(err => {
        console.log(err)
    })