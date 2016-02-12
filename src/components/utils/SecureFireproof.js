import $ from 'jquery';

var isCrossDomain = function( url ){

    var currentDomain = document.location.hostname,
        tempA = document.createElement( 'a' );

    tempA.setAttribute( 'href', url );

    return currentDomain !== tempA.hostname;

};

var SecureFireproof = function ( backendServer ) {

    this.backendServer = backendServer;
};

SecureFireproof.prototype = {

    list: function () {

        var deferred = new $.Deferred();
        var url = this.backendServer+'/list';

        $.ajax({
            crossDomain: isCrossDomain( url ),
            dataType: 'json',
            jsonp: false,
            processData: false,
            type: 'POST',
            url: url
        }).then( function ( childData ) {

            if ( childData && ! ( JSON.stringify( childData ) === '{}' )) {
                deferred.resolve( childData );
            } else {
                deferred.resolve();
            }

        }, deferred.reject );

        return deferred.promise();
    },

    child: function ( childPath ) {

        var deferred = new $.Deferred();
        var url = this.backendServer+'/child/'+ encodeURIComponent( childPath );

        $.ajax({
            contentType: 'application/json',
            crossDomain: isCrossDomain( url ),
            dataType: 'json',
            jsonp: false,
            processData: false,
            type: 'GET',
            url: url
        }).then( function ( childData ) {

            if ( childData && ! ( JSON.stringify( childData ) === '{}' )) {
                deferred.resolve( childData );
            } else {
                deferred.resolve();
            }

        }, deferred.reject );

        return deferred.promise();
    },

    match: function ( childPath ) {

        var url = this.backendServer+'/match/'+ encodeURIComponent( childPath );

        return $.ajax({
            crossDomain: isCrossDomain( url ),
            jsonp: false,
            processData: false,
            type: 'POST',
            url: url
        }).promise();
    },

    update: function ( value ) {

        var url = this.backendServer+'/update';

        return $.ajax({
            contentType: 'application/json',
            crossDomain: isCrossDomain( url ),
            data: JSON.stringify( value || {} ),
            jsonp: false,
            processData: false,
            type: 'POST',
            url: url
        }).promise();
    }
};

export default SecureFireproof;