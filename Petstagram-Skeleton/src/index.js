const express = require('express');
const routes = require('./routes');

const app = express();

// Middleware
app.use(express.static('public'));

// Body parser
app.use(express.urlencoded({extended: false}));

// Routes routes.js
app.use(routes);

app.listen(5000, console.log('Server is listening on port 5000...'));