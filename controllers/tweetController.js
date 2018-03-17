var tweetController = {} ;
var config = require("../config");
var Twit = require('twit');

var T = new Twit(config);


function getTimeline(screenName, limit) {
  var options = { screen_name: screenName,
                  count: limit };
  return T.get('statuses/user_timeline', options);
}

tweetController.handleGet =  function(req,res, next)  {
  var screenName = req.params['screen_name'];
  var limit = req.params.limit;
  getTimeline(screenName, limit).then(function(response) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ tweets: response }));
  });
}

module.exports = tweetController;
