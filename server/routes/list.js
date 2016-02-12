var config = require( './../../config.json' );
var express = require('express');
var Firebase = require('firebase');
var helpers = require('./../lib/helpers');
var _ = require('lodash');
var router = express.Router();

var firebaseConnection = new Firebase( config.firebase.server );

router.post('/list', function ( req, res ) {

    firebaseConnection.authWithCustomToken( config.firebase.secret ).then( function () {


        firebaseConnection.orderByChild('date').once('value', function ( snapshot ) {

            var data;
            var children = [];

            if ( snapshot && snapshot.val() ) {

                data = snapshot.val();

                for ( var key in data ) {

                    // remove sensitive information
                    if ( data[ key ].hasOwnProperty('email') ) {
                        delete data[ key ].email;
                    }

                    children.push( data[ key ] );
                }

                children = _.sortBy( children, function ( child ) {

                    return child.date;
                } );

                res.type('application/json');
                res.send( children );

            } else {
                res.type('application/json');
                res.send( children );
            }

        }, function () {
            helpers.respondWithServerError( res, 'error receiving children' );
        });

    }, function () {

        helpers.respondWithForbidden( res );
    });
});

module.exports = router;