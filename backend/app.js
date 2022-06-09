const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var firebase = require('firebase')

const filesRoutes = require('./routes/filesRoutes');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/api/files',filesRoutes);

module.exports = app;