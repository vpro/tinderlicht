import React from 'react';
import Firebase from 'firebase';
import Fireproof from 'fireproof';
import Promise from 'bluebird';

import login from './logic/login.js';

import NavBar from './interface/navbar.jsx';
import Profile from './interface/profile.jsx';
import Settings from './settings/settings.jsx';

// import ImageContainer from './game/ImageContainer.jsx';

// import Iconclass from './game/Iconclass.jsx';
// import Sidebar from './sidebar/Sidebar.jsx';


import data from '../assets/data/handschriften.json';
import Model from '../assets/data/model.jsx';

class Tinderlicht extends React.Component{
	constructor(props){
		super(props);
		this.login = login;
		this.state = {
			verluchtingen: data,
			appState: {
				imageClickPosition: null,
				currentName: 'Joost',
				currentPhoto: 'https://s3.amazonaws.com/uifaces/faces/twitter/nzcode/128.jpg',
				currentAge: 29,
				currentProfileText: 'Ik ben Jan. Bij nader inzien is deze foto eigenlijk niet zo verstandig voor een datingapp'
			},
			view: 'auth',
			authData: null,
			userData: null
		}
	}

	updateDB(){
		return this.fireproof.update({[this.state.userData.id]: this.state.userData});
	}

	setView(view){
		this.setState({view: view});
	}

	componentDidMount(){
		// Hier heel shitty json uit firebase halen wrs met axios
		var profileData = {};
		console.log(profileData);
	}

    render() {
    	if (this.state.view == 'auth'){
    		return (
    			<div className="app-container">
    				<div className="auth-container">
    						<h1>vpro<span className="oranje">tinder</span>licht</h1>
    						<p className="introduction">Wat leuk dat je een date zoekt om samen mee naar de <a href="https://dezwijger.nl/programma/tinder-love" target="_blank">Tegenlicht Meet Up</a> te gaan. Om je aan iemand te kunnen matchen, moet je inloggen met Twitter of Facebook. Je kan hieronder kiezen voor 1 van de 2. (Stating the obvious?)</p>
    						<br />
    					<span className="auth-button facebook"> 
    						<button className="auth-sm" onClick={this.login.bind(this, 'facebook')}>Login met Facebook</button>
    					</span>
    					<span className="auth-button twitter"> 
    						<button className="auth-sm" onClick={this.login.bind(this, 'twitter')}>Login met Twitter</button>
    					</span>
    				</div>
    			</div>
    		);
    	} else if (this.state.view == 'settings') {
    		var userData = this.state.userData; 

    			{/* Als profielSet is false, dan Settings anders ga naar Tinder */}
					if (userData.profile.profileSet === false) {
						return (
							<div>
								<NavBar/>
								<Settings userData={userData}/>
							</div>
						)
					} else { 
							this.setView('tinder');
							{/* Moet iets returnen */}
							return (<p>Loading</p>);
					}		
    	} else if (this.state.view == 'tinder') {
    		var userData = this.state.userData; 
	        return (
	        	<div className="app-container">
	        		<NavBar/>
	        		<Profile 
	        			profileName={this.state.appState.currentName} 
	        			profilePhoto={this.state.appState.currentPhoto}
	        			profileAge={this.state.appState.currentAge} 
	        			profileText={this.state.appState.currentProfileText} />
	        	</div>
	        );
	    } else if (this.state.view == 'tinderNoMatches'){
	    	return (
	    		<div className="app-container">
	    			<NavBar/>
	    				<br/>
	    			<p className="noMatch">Helaas. Er zijn nog geen matches beschikbaar. Maar kom snel een keer terug, want misschien zijn er dan wel potentiële dates die op je wachten. Je kan natuurlijk ook op de bonnefooi naar de Tegenlicht Meet Up gaan en wie weet spreek je dan iemand tijdens de borrel na afloop. Aanmelden kan hier.</p>
	    		</div>
	    	);
	    }
	}
}

export default Tinderlicht;