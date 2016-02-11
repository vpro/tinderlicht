import $ from 'jquery';

var SecureFireproof = function ( backendServer ) {

    this.backendServer = backendServer;
};

SecureFireproof.prototype = {

    child: function ( childPath ) {


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