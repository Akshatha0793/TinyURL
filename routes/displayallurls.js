const express = require('express');
const Url = require("../models/urls");

var displayallurls = express.Router();

displayallurls.get('/api/allurls',(req,res)=>{
    //var query = req.params.query;
   
    Url.find({}).then((data) => {
        console.log('Data: ', data);
        res.json(data);
    })
    .catch((error) => {
        console.log('error: ', error);
    });
    
});

module.exports = displayallurls;