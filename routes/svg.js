var express = require('express');
var router = express.Router();
var fs = require('fs');

router.post('/', function(req, res, next) {
    var path = decodeURIComponent(req.body.path);
    
    var files = fs.readdirSync('./public/svg/' + path);
    
    var data = files.map(function(name) {
        return {name: name};
    });
    
    res.json({
        success: true,
        data: data
    });
});

module.exports = router;