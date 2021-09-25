const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

// Allow Cross Origin
const cors = require('cors');

const app = express();

app.use(cors());

// Connect Cluster DB
mongoose.connect('mongodb+srv://admin:admin@cluster0.kxuzx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
mongoose.connection.once('open', () => {
  console.log('Database is running!');
})

app.use('/graphql', graphqlHTTP.graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(3000, () =>  {
  console.log('Server is running!');
});
