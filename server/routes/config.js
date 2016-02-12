var config = require( './../../config.json' );
var express = require('express');
var router = express.Router();

var configToShare = {
    firebase: {
        server: config.firebase.server
    },
    backend: {
        server: config.backend.server
    }
};

router.use('/config.js', function ( req, res ) {

    res.type('application/javascript');
    res.send( 'var TinderlichtConfig = '+ JSON.stringify( configToShare ) +';' );
});

module.exports = router;