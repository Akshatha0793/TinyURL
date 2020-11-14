const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const urlSchema = Schema({
    urlCode: String,
    longUrl: String,
    shortUrl: String,
    clickCount: Number
    
});

//Model

const urls = mongoose.model('urls', urlSchema);

module.exports = urls;