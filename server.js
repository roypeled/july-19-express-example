const express = require('express');
const fs = require('fs');
const app = express();

let messageHistory = require('./history.json') || [];

app.use(express.json());

function saveHistory() {
    fs.writeFileSync('history.json', JSON.stringify(messageHistory), {encoding: 'UTF-8'});
}

app.get('/', (req, res) => {
    res.send(
        fs.readFileSync('index.html', {encoding: 'UTF-8'})
    )
});

app.post('/messages', (req, res) => {
    messageHistory.push({
        ...req.body,
        id: messageHistory.length + 1,
    });
    saveHistory();
    res.send(messageHistory);
});

app.get('/messages', (req, res) => {
    res.send(messageHistory);
});

app.delete('/messages', (req, res) => {
    messageHistory = [];
    saveHistory();
    res.send(messageHistory);
});

app.get('/messages/:id', (req, res) => {
    res.send(messageHistory.find(item => item.id == req.params.id));
});

app.delete('/messages/:id', (req, res) => {
    messageHistory = messageHistory.filter(item => item.id != req.params.id);
    saveHistory();
    res.send(messageHistory);
});

app.listen(3000);