var axios = require('axios');

function toQueryString(obj) {
	var parts = [];
	for (var i in obj) {
	  if (obj.hasOwnProperty(i)) {
	    parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
	  }
	}
	return parts.join("&");
}

// client side variant
// var mailgunKey = window.btoa('api:key-def1ef87628689cc4994f262c244afbe');

// node variant
var mailgunKey = new Buffer("api:key-def1ef87628689cc4994f262c244afbe").toString('base64');

function sendEmail(name, adress){
	axios.post('https://api.mailgun.net/v3/sandboxc6071d29be3c4afcbc730683e8ddb72a.mailgun.org/messages', 
		toQueryString({
		  from: 'Mailgun Sandbox <postmaster@sandboxc6071d29be3c4afcbc730683e8ddb72a.mailgun.org>',
		  to: name + ' <' + adress + '>',
		  subject: 'Mail',
		  text: 'Bericht',
		  html: '<html>Beste ' + name + ',<br/><br /> Er is een match op vprotl. Mocht je bladiebladiebla, dan kan je je registreren op <a href="http://tegenlicht.vpro.nl">de website</a><hr>PS: Mocht je geen e-mail meer willen ontvangen, stuur dan een e-mailtje naar tegenlicht@vpro.nl voor een opt-out.</html>'
	  }), {
	  headers: {
	  		"Authorization": 'Basic ' + mailgunKey
	  	}
	  })
	  .then(function (response) {
	    console.log(response);
	  })
	  .catch(function (response) {
	    console.log(response);
	  });
}

sendEmail('Erik', 'erikvanzummeren@gmail.com')