import React from 'react';
import Firebase from 'firebase';
import Fireproof from 'fireproof';
import Promise from 'bluebird';

import axios from 'axios';

import login from './logic/login.js';

import Auth from './interface/auth.jsx';
import NavBar from './interface/navbar.jsx';
import Settings from './interface/settings.jsx';
import Profile from './interface/profile.jsx';
import Match from './interface/match.jsx';
import MutualLikes from './interface/mutual-likes.jsx';

import data from '../assets/data/mockusers.json';
import Model from '../assets/data/model.jsx';




// client side variant
class Tinderlicht extends React.Component{
	constructor(props){
		super(props);
		this.login = login;
		this.state = {
			profilesData: _.values(data),
			appState: {
				imageClickPosition: null,
			},
			view: 'auth',
			authData: null,
			userData: null
		}
	}

	toQueryString(obj) {
		var parts = [];
		for (var i in obj) {
		  if (obj.hasOwnProperty(i)) {
		    parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
		  }
		}
		return parts.join("&");
	}

	sendEmail(name, adress){
	// var mailgunKey = window.btoa('api:key-def1ef87628689cc4994f262c244afbe');

	axios.post('https://api.mailgun.net/v3/sandboxc6071d29be3c4afcbc730683e8ddb72a.mailgun.org/messages', 
		this.toQueryString({
		  from: 'Mailgun Sandbox <postmaster@sandboxc6071d29be3c4afcbc730683e8ddb72a.mailgun.org>',
		  to: name + ' <' + adress + '>',
		  subject: 'Mail',
		  text: 'Bericht',
		  html: '<html>Beste ' + name + ',<br/><br /> Er is een match op vprotl. Mocht je bladiebladiebla, dan kan je je registreren op <a href="http://tegenlicht.vpro.nl">de website</a><hr>PS: Mocht je geen e-mail meer willen ontvangen, stuur dan een e-mailtje naar tegenlicht@vpro.nl voor een opt-out.</html>'
	  }), {
	  headers: {
	  		"Authorization": 'Basic ' + window.btoa('api:key-def1ef87628689cc4994f262c244afbe'),
	  		"Access-Control-Allow-Headers": 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization',
	  		"Access-Control-Expose-Headers": 'PROTOCOL,X-Powered-By,Etag',
	  		"Access-Control-Allow-Origin": '*'
	  	}
	  })
	  .then(function (response) {
	  	console.log('waarom zie ik niks?');
	    console.log(response);
	  })
	  .catch(function (response) {
	    console.log(response);
	  });
}

	clickDislike(event){
		event.persist();
		event.preventDefault();
		registerDislike();
	}

	clickLike(event){
		event.persist();
		event.preventDefault();
		registerLike()
	}

	clickNext(event){
		event.persist();
		event.preventDefault();
		this.determinePosition();
		this.setView('tinder');
	}

	registerDislike(){
		this.setState(function(state){
			let curPos = this.state.userData.tinderStats.currentPosition;
			state.userData.tinderStats.dislikes.push(state.profilesData[curPos].id);
			return state;
		}, this.updateDB)
		console.log('register dislike');
		this.determinePosition();
	}

	registerLike(){
		this.setState(function(state){
			let curPos = this.state.userData.tinderStats.currentPosition;
			state.userData.tinderStats.likes.push(state.profilesData[curPos].id);
			return state;
		}, this.updateDB)
		console.log('Register like');
		this.seeIfMatch();
	}

	seeIfMatch() {
		var thisPos = this.state.userData.tinderStats.currentPosition;
		var determineIfClick = false;

		for(let i = 0; i < this.state.profilesData[thisPos].tinderStats.likes.length; i++){
			if(this.state.userData.id === this.state.profilesData[thisPos].tinderStats.likes[i]){
				console.log('HIT')
				console.log(this.state.profilesData[thisPos].tinderStats.likes[i])
				
				this.sendEmail('Erik', 'erikvanzummeren@gmail.com');

				this.setView('match');
				determineIfClick = false;
			}
		}
	}

	determinePosition(){
		var thisPos = this.state.userData.tinderStats.currentPosition + 1;
		/* Als gender juist is dan tonen, anders nog een keer deze func draaien */
		if(this.state.userData.genderPreference === this.state.profilesData[thisPos].gender){
			console.log('True: Dit is een vrouw')
			this.setState(function(state){
				state.userData.tinderStats.currentPosition++
				return state;
			}, this.updateDB)
		} else {
			console.log('False: Dit is een man')
			this.setState(function(state){
				state.userData.tinderStats.currentPosition++
				this.determinePosition()
				return state;
			}, this.updateDB)
		}
	}

//  var ref = new Firebase("https://tinderlicht.firebaseio.com");
// ref.orderByChild("date").on("child_added", function(snapshot) {
//   console.log(snapshot.key() + " was " + snapshot.val());
// });

	updateDB(){
		return this.fireproof.update({[this.state.userData.id]: this.state.userData});
	}

	setView(view){
		this.setState({view: view});
	}

	componentDidMount(){
		// Hier heel shitty json uit firebase halen wrs met axios
		var profileData = {};
	}

    render() {
    	if (this.state.view == 'auth'){
    		return (
    			<div className="app-container">
    				<div className="auth-container">
    					<Auth />
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
	        		  <div className="profileContainer">
			        		<Profile 
			        			profileName={this.state.profilesData[this.state.userData.tinderStats.currentPosition].name} 
			        			profilePhoto={this.state.profilesData[this.state.userData.tinderStats.currentPosition].profilePhoto}
			        			profileAge={this.state.profilesData[this.state.userData.tinderStats.currentPosition].profile.age} 
			        			profileText={this.state.profilesData[this.state.userData.tinderStats.currentPosition].profile.profileText} />
			        	</div>
			        	<div className="profile__buttons">
                  <span onClick={this.registerDislike.bind(this)} className="icon-cross"></span>
                  <span onClick={this.registerLike.bind(this)} className="icon-heart"></span>
                </div>
	        	</div>
	        );
	    } else if (this.state.view == "match") {
	    	return (
	    		<div className="app-container">
	    			<NavBar />
	    				<br/>
	    			<Match profileUrl={this.state.profilesData[this.state.userData.tinderStats.currentPosition].profileUrl}
	    						profileId={this.state.profilesData[this.state.userData.tinderStats.currentPosition].id} />
	    			<span onClick={this.clickNext.bind(this)}>Ga verder</span>
	    		</div>
	    	)
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