var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res, next) {
    res.sendFile('help.html', {
        root: path.join(__dirname, '../public/')
    });
});

module.exports = router;
