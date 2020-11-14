const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const shortid = require("shortid");
const validUrl = require("valid-url");
const app = express();
const PORT = process.env.PORT || 8080;

const getShortenUrlRoute = require('./routes/getshortenurl');
const shortUrlRoute = require('./routes/shorturl');
const displayAllRoute = require('./routes/displayallurls');

mongoose.connect('mongodb://localhost/shortUrls',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});



mongoose.connection.on('connected',()=>{
    console.log("Mongo db connected!");
});

app.use(express.json({}));

app.listen(PORT, () => console.log("Server is listening on port " + PORT));


app.use(morgan('tiny'));

app.use(cors());
app.use(displayAllRoute);
app.use(getShortenUrlRoute)
app.use(shortUrlRoute);



