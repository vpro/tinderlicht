var config = require( './../../config.json' );

var axios = require( 'axios' );
var debug = require( 'debug' )( 'tinderlicht' );
var express = require( 'express' );
var Firebase = require( 'firebase' );
var fs = require('fs');
var helpers = require( './../lib/helpers' );
var Mustache = require('mustache');
var router = express.Router();

var firebaseConnection = new Firebase( config.firebase.server );
var MAILGUN_KEY = new Buffer( config.mail.apikey ).toString('base64');
var MAIL_TMPL = fs.readFileSync( __dirname +'/../templates/mail.tmpl', 'utf8');

var nodemailer = require('nodemailer');
var sendmailTransport = require('nodemailer-sendmail-transport');
var mailTransporter = nodemailer.createTransport(sendmailTransport({
    path: '/usr/lib/sendmail'
}));

// TODO: validate path
var isValidPath = function ( path ) {
    return true;
};

var toQueryString = function ( obj ) {
    var parts = [];
    for ( var i in obj ) {
        if ( obj.hasOwnProperty( i ) ) {
            parts.push( encodeURIComponent( i ) + "=" + encodeURIComponent( obj[i] ) );
        }
    }
    return parts.join( "&" );
};

var sendEmail = function ( name, adress ) {

    var mailDomain = config.mail.domain;

    return axios.post( 'https://api.mailgun.net/v3/'+ mailDomain +'.mailgun.org/messages',
        toQueryString( {
            from: 'VPRO Tegenlicht <postmaster@'+ mailDomain +'.mailgun.org>',
            to: name + ' <' + adress + '>',
            subject: 'Match via VPRO Tinderlicht!',
            text: Mustache.render( MAIL_TMPL, { name: name, break: '\n' } ),
            html: Mustache.render( MAIL_TMPL, { name: name, break: '<br />' } )
        } ), {
            headers: {
                "Authorization": 'Basic ' + MAILGUN_KEY
            }
        } );
};

var sendMailer = function ( name, adress, callback ) {

    mailTransporter.sendMail({
            from: 'VPRO Tegenlicht <postmaster@'+ mailDomain +'.mailgun.org>',
            to: name + ' <' + adress + '>',
            subject: 'Match via VPRO Tinderlicht!',
            text: Mustache.render( MAIL_TMPL, { name: name, break: '\n' } ),
            html: Mustache.render( MAIL_TMPL, { name: name, break: '<br />' } )
        }, callback );
};

/**
 * Will only respond to a post request
 * @param {String} :id The user id of the user that has a match
 */
router.post( '/match/:id', function ( req, res ) {

    if ( ! ( req.params && req.params.id && isValidPath( req.params.id ) ) ) {

        helpers.respondWithBadRequest( res );

    } else {

        firebaseConnection.authWithCustomToken( config.firebase.secret ).then( function () {

            firebaseConnection.child( req.params.id ).once( 'value', function ( dataSnapshot ) {

                var data = dataSnapshot.val();

                if ( data && data.id === req.params.id && data.email.length ) {

                    //sendEmail( data.name, data.email ).then(function () {
                    //    helpers.respondWithSuccess( res );
                    //}, function () {
                    //    helpers.respondWithServerError( res, 'mail failure');
                    //});

                    sendMailer( data.name, data.email, function ( err ) {
                        if ( err ) {
                            helpers.respondWithServerError( res, 'mail failure' );
                        } else {
                            helpers.respondWithSuccess( res );
                        }
                    } )

                } else {
                    helpers.respondWithBadRequest( res );
                }

            }, function () {
                helpers.respondWithServerError( res, 'error fetching firebase child' );
            } );

        }, function () {

            helpers.respondWithForbidden( res );
        } );
    }
} );


module.exports = router;