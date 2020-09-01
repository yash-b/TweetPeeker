var express = require('express');
var Twitter = require('twit');
var router = express.Router();
require('dotenv').config();
// console.log(process.env.CONSUMER_KEY)

// IMPORTANT: ENTER TWITTER API CREDENTIALS HERE
// Visit https://developer.twitter.com/en/docs/authentication/oauth-1-0a/obtaining-user-access-tokens for more info.
const client = new Twitter({
  consumer_key: CONSUMER_KEY,
  consumer_secret: CONSUMER_SECRET,
  access_token: ACCESS_TOKEN,
  access_token_secret: ACCESS_TOKEN_SECRET
});

const TWEET_LIMIT = 80;

router.get('/all', (req, res) => {
  const params = { tweet_mode: 'extended', count: TWEET_LIMIT };
  client
    .get(`statuses/home_timeline`, params)
    .then(timeline => {
      res.send(timeline);
    })
    .catch(error => {
    res.send(error);
  });
});

// tweets based on search
router.get('/search', (req, res) => {
  var para = req.url.match(/[^=]+$/)[0];
  console.log(para);
  const params = { q: para, count: TWEET_LIMIT };
  client
    .get(`search/tweets`, params)
    .then(timeline => {
      res.send(timeline);
    })
    .catch(error => {
    res.send(error);
  });
});

// tweets from user
router.get('/user', (req, res) => {
  var para = req.url.match(/[^=]+$/)[0];
  const params = { screen_name: para, count: TWEET_LIMIT };
  client
    .get(`statuses/user_timeline`, params)
    .then(timeline => {
      res.send(timeline);
    })
    .catch(error => {
    res.send(error);
  });
});

// tweets based on user's search
router.get('/user/search', (req, res) => {
  var para = req.url.match(/[^=]+$/)[0];
  console.log(para);
  const params = { q: para, count: TWEET_LIMIT };
  client
    .get(`users/search`, params)
    .then(timeline => {
      res.send(timeline);
    })
    .catch(error => {
    res.send(error);
  });
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
