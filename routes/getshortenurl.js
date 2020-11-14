const express = require("express");
const Url = require("../models/urls");

var getShortenUrlRoute = express.Router();
getShortenUrlRoute.get('/:shortUrl', async (req, res) => {
    var shortUrlCode = req.params.shortUrl;
    var url = await Url.findOne({ urlCode: shortUrlCode });

    var allowedClick = 10;
    try {
        if (url) {
            var clickCount = url.clickCount;
            if(clickCount >= allowedClick){
                console.log("The click count for shortcode " + shortUrlCode + " has passed the limit of " + allowedClick);
                return res.status(400).json("The click count for shortcode " + shortUrlCode + " has passed the limit of " + allowedClick);
            }
            clickCount++;
            await url.update({ clickCount });
            return res.redirect(url.longUrl);
        } else {
            return res.status(400).json("The short url doesn't exists in our system.");
        }
    }
    catch (err) {
        console.error("Error while retrieving long url for shorturlcode " + shortUrlCode);
        return res.status(500).json("There is some internal error.");
    }
})

module.exports = getShortenUrlRoute;