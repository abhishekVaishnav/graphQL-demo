const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const path = require('path');

// Allow Cross Origin
const cors = require('cors');

const app = express();

app.use(cors());

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.use('/', express.static(path.join(__dirname, 'public/dist')));

// Connect Cluster DB
mongoose.connect('mongodb+srv://admin:admin@cluster0.kxuzx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
mongoose.connection.once('open', () => {
  console.log('Database is running!');
})

app.use('/graphql', graphqlHTTP.graphqlHTTP({
  schema,
  graphiql: true,
}));

app.get('/*', function(req, res, next) {
  res.sendFile(__dirname + '/public/dist/index.html');
});

app.listen(3000, () =>  {
  console.log('Server is running!');
});
