var express = require('express');
var router = express.Router();

function(req, res){
    let time = new Date().getMinutes();
    res.send("Hello -> ");
}