const express = require('express');

const app = express();

// Test action
app.get('/', (req, res) => {
    res.send('First action');
});

app.listen(5000, console.log('Server is listening on port 5000...'));