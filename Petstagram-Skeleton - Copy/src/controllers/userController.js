const router = require('express').Router();
const User = require('../models/User');

const userManager = require('../managers/userManager');

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const token = await userManager.login({username, password});

    res.cookie('token', token);

    res.redirect('/');
});

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', async (req, res) => {
<<<<<<< HEAD
    const { username, email, password, repeatPassword } = req.body;
    await userManager.register({username, email, password, repeatPassword});

    res.redirect('/users/login');
=======
    const { email, username, password, repeatPassword } = req.body;
    await userManager.register(email, username, password, repeatPassword);
    res.send('Registered!');
>>>>>>> parent of fe6c429 (Register added and tested.)
});

module.exports = router;