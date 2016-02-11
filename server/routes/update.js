var bodyParser = require('body-parser');
var config = require( './../../config.json' );
var express = require('express');
var Firebase = require('firebase');
var helpers = require('./../lib/helpers');
var router = express.Router();

var firebaseConnection = new Firebase( config.firebase.server );

router.post('/update', bodyParser.json(), function ( req, res ) {

    if ( ! req.body ) {

        helpers.respondWithBadRequest( res );

    } else {

        firebaseConnection.authWithCustomToken( config.firebase.secret ).then( function () {

            firebaseConnection.update( req.body ).then( function () {
                helpers.respondWithSuccess(res);
            }, function () {
                helpers.respondWithServerError( res, 'error updating firebase' );
            });

        }, function () {

            helpers.respondWithForbidden( res );
        });
    }
});

module.exports = router;