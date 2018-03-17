var newsController = {}
var cheerio = require('cheerio');
var fs = require('fs');
var request = require('request');
var axios = require('axios');

var scrapeUrl = "https://edition.cnn.com/specials/politics/trumpmerica/";
var scrapeUrl2 = "https://edition.cnn.com/specials/politics/president-donald-trump-45";

newsController.handleGet = function(req, res, next) {
  var stories = [];
  request(scrapeUrl, function(error, response, html) {
    var $ = cheerio.load(html);
    var headings = $('.cd__headline');
    headings.each(function(i, element){
      var slug =  $(this).children('a').attr('href')
      var title = $(this).children('a').text();
      stories.push({"headline": title, "slug": slug })
    })
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ stories: stories }));

  })

}

module.exports = newsController;
