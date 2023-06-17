const router = require('express').Router();

const userManager = require('../managers/userManager');

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const token = await userManager.login({username, password});
    res.send('Logged in');
});

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', async (req, res) => {
    const { username, email, password, repeatPassword } = req.body;
    if (username.length < 2 ) {
        throw new Error ('Username must be at least 2 symbols!');
    }
    if (email.length < 10 ) {
        throw new Error ('Email must be at least 10 symbols!');
    }
    if (password.length < 4 ) {
        throw new Error ('Password must be at least 4 symbols!');
    }
    if (password !== repeatPassword) {
        throw new Error ('Password mismatch!');
    }
    await userManager.register({username, email, password, repeatPassword});
    res.send('Registered!');
});

module.exports = router;