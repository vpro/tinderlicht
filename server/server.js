var debug = require('debug')('tinderlicht');
var fs = require('fs');
var process = require('process');

process.chdir( __dirname );


fs.stat('../config.json', function ( err, stats ) {

    if ( err || ! stats.isFile() ) {

        debug('Required config.json missing! Create one according to the docs.');

    } else {

        /**
         * App moet kunnen
         * -    inloggen
         * -    data ophalen en als json teruggeven
         * -
         */

        var express = require('express');
        var app = express();
        var cors = require('cors');
        var config = require('../config.json');
        var Firebase = require('firebase');
        var firebaseConnection = new Firebase( config.firebase.server );
        var server = require('http').Server( app );

        // binding to 0.0.0.0 allows connections from any other computer in the network
        // to your ip address
        var ipAddress = process.env.IP || '0.0.0.0';
        var port = process.env.PORT || 4000;


        var childRouter = require('./routes/child');
        var configRouter = require('./routes/config');
        var listRouter = require('./routes/list');
        var matchRouter = require('./routes/match');
        var privacyRouter = require('./routes/privacyPolicy');
        var updateRouter = require('./routes/update');

        app.use( cors() );
        app.use( childRouter );
        app.use( configRouter );
        app.use( listRouter );
        app.use( matchRouter );
        app.use( privacyRouter );
        app.use( updateRouter );

        if ( process.env.NODE_ENV && process.env.NODE_ENV === 'production' ) {
            app.use( express.static( __dirname +'/../build') );
            app.use('/', function( req, res ){
              res.location( 'index.html' );
            });
        }

        firebaseConnection.authWithCustomToken( config.firebase.secret ).then( function () {

            server.listen( port, ipAddress, function () {
                debug( 'started on localhost:' + port );
            } );

        }, function () {
            debug( 'Firebase authentication failed' );
        } );
    }
});