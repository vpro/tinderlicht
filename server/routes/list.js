var config = require( './../../config.json' );
var express = require('express');
var Firebase = require('firebase');
var helpers = require('./../lib/helpers');
var router = express.Router();

var firebaseConnection = new Firebase( config.firebase.server );

router.post('/list', function ( req, res ) {

    firebaseConnection.authWithCustomToken( config.firebase.secret ).then( function () {


        firebaseConnection.orderByChild('date').once('value', function ( snapshot ) {

            var children = [];
            var data;
            var child;

            if ( snapshot && snapshot.val() ) {

                data = snapshot.val();

                for ( var key in data ) {

                    // remove sensitive information
                    if ( data[ key ].hasOwnProperty('email') ) {
                        delete data[ key ].email;
                    }
                }

                res.type('application/json');
                res.send( data );

            } else {
                res.type('application/json');
                res.send( {} );
            }

        }, function () {
            helpers.respondWithServerError( res, 'error receiving children' );
        });

    }, function () {

        helpers.respondWithForbidden( res );
    });
});

module.exports = router;