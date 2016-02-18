var express = require('express');
var fs = require('fs');
var router = express.Router();

router.use('/privacypolicy.html', function ( req, res ) {

    var privacyPolicy = fs.readFileSync( __dirname +'/../../privacypolicy.html');
    res.type('text/html');
    res.send( privacyPolicy );
});

module.exports = router;