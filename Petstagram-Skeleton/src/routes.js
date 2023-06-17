const router = require('express').Router();

// TODO: add controller router

// Test action
router.get('/', (req, res) => {
    res.render('home');
});

module.exports = router;