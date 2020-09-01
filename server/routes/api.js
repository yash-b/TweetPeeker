var express = require('express');
var router = express.Router();

router.get("/", function(req, res, next) {
    console.log("Test api.js")
    // res.send("API is working properly");
    res.render('index', { title: 'Express' });
});

module.exports = router;