var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

router.post('/', function(req, res, next) {
    var pathName = decodeURIComponent(req.body.path);

    var files = fs.readdirSync(path.join(__dirname, '../public/svg/') + pathName);

    var data = files.map(function(name) {
        return {name: name};
    });

    res.json({
        success: true,
        data: data
    });
});

module.exports = router;
