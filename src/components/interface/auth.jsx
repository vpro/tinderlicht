import React from 'react';

import tinderlicht from '../../assets/icons/tinderlicht.svg';

class Auth extends React.Component{
  render() {
	if(navigator.userAgent.match('CriOS')){
		var browserSupport = "Deze app ondersteunt geen Chrome iOS. Gebruik Safari!"
	} else {
		var browserSupport = ""
	}
	  return (
	  	<div>
        <img className="auth__logointro" src={tinderlicht} />
				<p className="auth__introductiontext">Met VPRO Tinderlicht kun je op zoek naar een date voor de <a href="https://dezwijger.nl/programma/tinder-love" target="_blank">Tegenlicht Meet Up</a> over de aflevering <a href="http://tegenlicht.vpro.nl/afleveringen/2015-2016/tinder-love.html" target="_blank">Tinder love</a>. Om je te kunnen matchen, moet je inloggen met Twitter of Facebook.<br/>{browserSupport}</p>
				<br />
	  	</div>
	    );
  	}
}

export default Auth;
