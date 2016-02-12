import $ from 'jquery';

var SecureFireproof = function ( backendServer ) {

    this.backendServer = backendServer;
};

SecureFireproof.prototype = {

    child: function ( childPath ) {

        var deferred = new $.Deferred();

        $.ajax({
            contentType: 'application/json',
            crossDomain: true,
            dataType: 'json',
            jsonp: false,
            processData: false,
            type: 'GET',
            url: this.backendServer+'/child/'+ encodeURIComponent( childPath )
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
        return $.ajax({
            crossDomain: true,
            jsonp: false,
            processData: false,
            type: 'POST',
            url: this.backendServer+'/match/'+ encodeURIComponent( childPath )
        }).promise();
    },

    update: function ( value ) {

        return $.ajax({
            contentType: 'application/json',
            crossDomain: true,
            data: JSON.stringify( value || {} ),
            jsonp: false,
            processData: false,
            type: 'POST',
            url: this.backendServer+'/update'
        }).promise();
    }
};

export default SecureFireproof;