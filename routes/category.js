var express = require('express');
var router = express.Router();
var fs = require('fs');

router.post('/', function(req, res, next) {
    var category = fs.readdirSync('./public/svg/');
    
    var data = category.map(function(name) {
        return {name: name};
    });
    
    res.json({
        success: true,
        data: data
    });
});

module.exports = router;