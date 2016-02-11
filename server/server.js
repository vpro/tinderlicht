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

        var app = require('express')();
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
        var updateRouter = require('./routes/update');

        app.use( childRouter );
        app.use( configRouter );
        app.use( updateRouter );

        firebaseConnection.authWithCustomToken( config.firebase.secret ).then( function () {

            server.listen( port, ipAddress, function () {
                debug( 'started on localhost:' + port );
            } );

        }, function () {
            debug( 'Firebase authentication failed' );
        } );
    }
});