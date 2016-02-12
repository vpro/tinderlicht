var config = require( './../../config.json' );
var debug = require('debug')('tinderlicht');
var express = require('express');
var Firebase = require('firebase');
var helpers = require('./../lib/helpers');
var router = express.Router();

var firebaseConnection = new Firebase( config.firebase.server );

// TODO: validate path
var isValidPath = function ( path ) {
    return true;
};

router.get('/child/:path', function ( req, res ) {


    if ( ! ( req.params && req.params.path && isValidPath( req.params.path ) ) ) {

        helpers.respondWithBadRequest( res );

    } else {

        firebaseConnection.authWithCustomToken( config.firebase.secret ).then( function () {

            firebaseConnection.child( decodeURIComponent( req.params.path ) ).once( 'value', function ( dataSnapshot ) {
                var data = dataSnapshot.val();

                if ( data ) {

                    // remove secure data
                    delete data.email;

                    res.type('application/json');
                    res.send( data );

                } else {
                    res.send({});
                }

            }, function () {
                helpers.respondWithServerError( res, 'error fetching firebase child' );
            });

        }, function () {

            helpers.respondWithForbidden( res );
        });
    }
});


module.exports = router;