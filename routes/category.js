var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

router.post('/', function(req, res, next) {
    var category = fs.readdirSync(path.join(__dirname, '../public/svg/'));

    var data = category.map(function(name) {
        return {name: name};
    });

    res.json({
        success: true,
        data: data
    });
});

module.exports = router;
