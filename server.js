const express = require('express');
const fs = require('fs');
const app = express();

const messageHistory = require('./history.json') || [];

app.get('/', (req, res) => {
    res.send(
        fs.readFileSync('index.html', {encoding: 'UTF-8'})
    )
});

app.get('/create-message', (req, res) => {
    messageHistory.push(req.query);
    fs.writeFileSync('history.json', JSON.stringify(messageHistory), {encoding: 'UTF-8'});
    res.send(messageHistory);
});

app.get('/read-messages', (req, res) => {
    res.send(messageHistory);
});

app.listen(3000);