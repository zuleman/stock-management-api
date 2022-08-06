// Express Setup
const express = require('express');
const app = express();

//biar bisa baca req.body
app.use(express.urlencoded({extended:true}));
app.use(express.json());

module.exports = app;