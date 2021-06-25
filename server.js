//Import express and mongoose libraries
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

//Instantiate our app and port for express
const app = express();
const PORT = process.env.PORT || 3001;

//Middleware to allow our routes to accept JSON objects
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Instruct the server to use the defined routes
app.use(routes);

//Instruct mongoose to connect with the website mongodb or create and connect with the specified local database
mongoose.connect('mongodb://localhost:social-network', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true, 
});

//Instruct mongoose to console log queries
mongoose.set('debug', true);

//Provide notification if mongoose successfully connected or not
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Mongoose is connected!'));

//Instruct our app to listen on the designated PORT
app.listen(PORT, () => console.log(`Server connected to port: ${PORT}`));
