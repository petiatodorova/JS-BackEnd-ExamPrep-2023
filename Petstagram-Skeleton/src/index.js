const express = require('express');
const routes = require('./routes');
const handlebars = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const { auth } = require('./middlewares/authMiddleware');
const { errorHandler } = require('./middlewares/errorHandlerMiddleware');

const app = express();

// TODO change DB name
mongoose.connect('mongodb://127.0.0.1:27017/petstagram')
    .then(() => console.log('DB connected successfully'))
    .catch(err => console.log('DB Error, ', err.message));

// Add handlebars
app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.set('views', 'src/views');

// Middleware
// TODO /static?
app.use('/static', express.static(path.resolve(__dirname, 'public')));

// Body parser
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(auth);

// Routes routes.js
app.use(routes);
app.use(errorHandler);

app.listen(5000, console.log('Server is listening on port 5000...'));