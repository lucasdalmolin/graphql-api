const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const schema = require('./server/schema/schema');
const testSchema = require('./server/schema/types_schema');
const mongoose = require("mongoose")

const app = express();
const port = process.env.PORT || 4000

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema
}))
mongoose.connect(`mongodb+srv://lucasdalmolin:adentro1@graphqlcluster.8lfwmva.mongodb.net/?retryWrites=true&w=majority`,
    {useNewUrlParser: true, useUnifiedTopology: true,}
 ). then(() => {
    app.listen({port: port}, () => {
        console.log('Listenin for request.');
    });
 }).catch((e) => console.log("Error:", e))
