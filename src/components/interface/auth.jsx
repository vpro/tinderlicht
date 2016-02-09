import React from 'react';

import tinderlicht from '../../assets/icons/tinderlicht.svg';

class Auth extends React.Component{
  render() {
	  return (
	  	<div>
        <img className="auth__logointro" src={tinderlicht} />
				<p className="auth__introductiontext">Tinderlicht is de datingapp voor Tegenlichtkijkers. Vind een date, en ga samen naar een van de <a href="https://dezwijger.nl/programma/tinder-love" target="_blank">Tegenlicht Meet Ups</a>. Om je aan iemand te kunnen matchen, moet je inloggen met Twitter of Facebook.</p>
				<br />
	  	</div>
	    );
  	}
}

export default Auth;
