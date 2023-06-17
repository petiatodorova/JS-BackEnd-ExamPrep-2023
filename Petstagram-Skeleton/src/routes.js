const router = require('express').Router();

// TODO: add controller router

// Test action
router.get('/', (req, res) => {
    res.send('First action');
});

module.exports = router;