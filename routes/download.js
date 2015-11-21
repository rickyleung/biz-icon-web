var express = require('express');
var router = express.Router();
var zip = require('express-zip');

router.get('/', function(req, res, next) {
    var path = decodeURIComponent(req.query.path),
        fullPath = './public/svg/' + path + '/';
    
    var files = req.query.fileName.split(',').map(function(name) {
        var fileName = name + '.svg';
        return {
            path: fullPath + fileName,
            name: fileName
        };
    });
    
    res.zip(files, 'biz-icon_' + (new Date()).getTime() + '.zip');
});

module.exports = router;