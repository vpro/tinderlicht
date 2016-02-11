exports.respondWithBadRequest = function ( res ) {

    res.sendStatus(400);
};

exports.respondWithForbidden = function ( res ) {

    res.sendStatus(403);
};

exports.respondWithServerError = function ( res, errorMsg ) {

    res.status(500).send( errorMsg );
};

exports.respondWithSuccess = function ( res ) {

    res.sendStatus(200);
};