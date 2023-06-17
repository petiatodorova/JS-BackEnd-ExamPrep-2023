const express = require('express');
const routes = require('./routes');
const handlebars = require('express-handlebars');

const app = express();

// Add handlebars
app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', 'src/views');

// Middleware
app.use(express.static('public'));

// Body parser
app.use(express.urlencoded({extended: false}));

// Routes routes.js
app.use(routes);

app.listen(5000, console.log('Server is listening on port 5000...'));