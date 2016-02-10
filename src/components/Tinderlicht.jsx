import React from 'react';
import Firebase from 'firebase';
import Fireproof from 'fireproof';
import Promise from 'bluebird';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import axios from 'axios';
import RadioGroup from 'react-radio-group';

import login from './logic/login.js';

import Auth from './interface/auth.jsx';
import NavBar from './interface/navbar.jsx';
import Settings from './interface/settings.jsx';
import Profile from './interface/profile.jsx';
import Match from './interface/match.jsx';
import MutualLikes from './interface/mutual-likes.jsx';

import Twitter from './interface/social.jsx';


import tinderlicht from '../assets/icons/tinderlicht.svg';
import data from '../assets/data/mockusers.json';
import Model from '../assets/data/model.jsx';


// client side variant
class Tinderlicht extends React.Component{
	constructor(props){
		super(props);
		this.login = login;
		this.state = {
			
			profilesData: _.values(data),
			profilesDataObj: data,
			view: 'auth',
			mutualLikes: [],
			authData: null,
			userData: null
		}
	}


	checkEndOfUsers(){
	console.log(this.state);
	var totalProfiles = this.state.profilesData.length - 1;
		if(this.state.userData.tinderStats.currentPosition < totalProfiles){
		} else {
			this.setView('tinderNoMatches');
		}
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

	clickTinder(event){
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
		var thereIsAMatch = null;

		for(let i = 0; i < this.state.profilesData[thisPos].tinderStats.likes.length; i++){
			if(this.state.userData.id === this.state.profilesData[thisPos].tinderStats.likes[i]){
				thereIsAMatch = true;
			}
		}

		if(thereIsAMatch === true) {
			this.setView('match');
		} else {
			this.determinePosition();
		}
	}

	determinePosition(){
		var thisPos = this.state.userData.tinderStats.currentPosition + 1;

		/* Als gender juist is dan tonen, anders nog een keer deze func draaien */
		if(this.state.userData.genderPreference === this.state.profilesData[thisPos].gender){
			console.log('Juiste voorkeur')
			this.setState(function(state){
				state.userData.tinderStats.currentPosition++
				return state;
			}, this.updateDB)
		} else if(this.state.userData.genderPreference === 'bi') { 
			console.log('bisexual')
			this.setState(function(state){
				state.userData.tinderStats.currentPosition++
				return state;
			}, this.updateDB)
		} else {
			console.log('Niet de juiste voorkeur: Skip')
			this.setState(function(state){
				state.userData.tinderStats.currentPosition++
				this.determinePosition()
				return state;
			}, this.updateDB)
		}
	}

	clickMutualLike(event){
		event.persist();
		event.preventDefault();
		this.createMutualLikes();
	}

	createMutualLikes(){
		var tempMutualLikes = [];
		for (let i = 1; i < this.state.userData.tinderStats.likes.length; i++){
			var currentProf = this.state.userData.tinderStats.likes[i];
			if(_.contains(this.state.profilesDataObj[currentProf].tinderStats.likes, this.state.userData.id) === true){
				console.log(currentProf, ' is een match') 
				tempMutualLikes.push(currentProf);
			} else {
				console.log(currentProf, ' geen match');
			}
		}

		this.setState(function(state){
			state.mutualLikes = tempMutualLikes
			return state;
		})
		console.log(this.state.mutualLikes);
		this.showMutualLikes();

	}

	showMutualLikes(){
		this.setView('matches');
	}

	handleAgeChange(event){
		var leeftijd = event.target.value.substring(0, 2);
		console.log(leeftijd);
		this.ageChanger(leeftijd);
	}

	ageChanger(leeftijd){
		this.setState(function(state){
			state.userData.profile.age = leeftijd
			return state;
		}, this.updateDB)	
	}
	/* 'event handlers' */
	buttonNext(event){ this.nextSettingsState() }
	setMaleHandler(event){ this.setGender('male') }
	setFemaleHandler(event){ this.setGender('female') }
	setPreferenceMaleHandler(event) { this.setPreference('male') }
	setPreferenceFemaleHandler(event) { this.setPreference('female') }
	setPreferenceBiHandler(event) { this.setPreference('bi') }
	setMeetupNietHandler(event) { this.setTegenlichtStatus('niet') }
	setMeetupMisschienHandler(event) { this.setTegenlichtStatus('misschien') }
	setMeetupZekerHandler(event) { this.setTegenlichtStatus('zeker') }

	handleEmailChange(event) { 
		var emailadres = event.target.value;
		this.setEmail(emailadres);
	}

	handleProfileChange(event){
		var profieltekst = event.target.value.substring(0, 200);
		this.setProfile(profieltekst);
	}

	setTegenlichtLocatieHandler(event){
	var locatie = event;
	this.setTegenlichtLocatie(locatie);
	}

	nextSettingsState(){
		if(this.state.view <= 5){
			var newState = this.state.view + 1;
			console.log(newState);
			this.setView(this.state.view+1)
		} else {
			this.setState(function(state){
				state.userData.profile.profileSet = true;
				return state;
			}, this.updateDB)	
			this.setView('tinder');
		}
	}

	/* Settings gender */
	setGender(gender){
		this.setState(function(state){
			state.userData.gender = gender;
			return state;
		}, this.updateDB)	
	}

	setPreference(gender){
		this.setState(function(state){
			state.userData.genderPreference = gender;
			return state;
		}, this.updateDB)	
	}

	/* Settings email */
	setEmail(emailadr){
		this.setState(function(state){
			state.userData.email = emailadr;
			return state;
		}, this.updateDB)			
	}

	/* Settings profile */
	setProfile(profieltekst){
		this.setState(function(state){
			state.userData.profile.profileText = profieltekst
			return state;
		}, this.updateDB)	
	}
	/* Settings Meetup */
	setTegenlichtStatus(status){
		this.setState(function(state){
			state.userData.profile.tegenlichtMeetup = status;
			return state;
		}, this.updateDB)	
	}

	setTegenlichtLocatie(location){
		this.setState(function(state){
			state.userData.profile.tegenlichtLocatie = location;
			return state;
		}, this.updateDB)			
	}

	/* Nav */
	tinderMenuHandler(event){
		event.persist();
		event.preventDefault();
		this.setView('tinder');
	}


clickInnersettings(event){
		event.persist();
		event.preventDefault();
		this.setView('innersettings');
}




//  var ref = new Firebase("https://tinderlicht.firebaseio.com");
// ref.orderByChild("date").on("child_added", function(snapshot) {
//   console.log(snapshot.val());
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
    						<div className="auth-sm" onClick={this.login.bind(this, 'facebook')}>Login met Facebook</div>
    					</span>
    					<span className="auth-button twitter"> 
    						<div className="auth-sm" onClick={this.login.bind(this, 'twitter')}>Login met Twitter</div>
    					</span>
    				</div>
    			</div>
    		);
    	} else if (this.state.view == 1) {
    		var userData = this.state.userData; 

    			{/* Als profielSet is false, dan Settings anders ga naar Tinder */}
					if (userData.profile.profileSet === false) {
						return (
							<div className="settings">
								<NavBar settingsmode={true}/>
								<ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
								<h1>Hoi <span className="oranje">{this.state.userData.name}</span>,</h1>
								<p className="settings-text">Om fans van het programma aan elkaar te matchen, moet je wel fan van het programma zijn. Als je VPRO Tegenlicht nog niet volgt op Facebook, dan kun je dat nu alsnog doen.</p>
								</ReactCSSTransitionGroup>
								<div className="verderbutton" onClick={this.buttonNext.bind(this)}>Verder</div>
								{ /* http://stackoverflow.com/questions/25234101/how-to-integrate-the-twitter-widget-into-reactjs */ }

								{ /* <Settings userData={userData}/> */ }
							</div>
						)
					} else { 
							this.setView('tinder');
							{/* Moet iets returnen */}
							return (<p>Loading</p>);
					}		
    	} else if (this.state.view == 2) {
    		var userData = this.state.userData; 

    			{/* Als profielSet is false, dan Settings anders ga naar Tinder */}
						return (
							<div className="settings">
								<NavBar settingsmode={true}/>
									<h1>Leeftijd</h1>
									<p className="settings-text">Om je zo goed mogelijk te kunnen matchen, willen we graag een paar gegevens van je weten. Die gebruiken we alleen om je te kunnen matchen en voor geen enkel ander doel.</p>
									<p className="settings-text">Mogen we weten hoe oud je bent?</p>
									<input type="number" onkeypress='return event.charCode >= 48 && event.charCode <= 57' min="18" max="99" placeholder="??" value={this.state.userData.profile.age} onChange={this.handleAgeChange.bind(this)}></input>
								<div className="verderbutton" onClick={this.buttonNext.bind(this)}>Verder</div>
							</div>
						)
    	} else if (this.state.view == 3) {
    		var userData = this.state.userData; 
    		    
    			{/* Als profielSet is false, dan Settings anders ga naar Tinder */}
						return (
							<div className="settings">
								<NavBar settingsmode={true}/>
								<h1>Geaardheid</h1>
								<p className="settings-text">Het helpt ook om te weten wat je geslacht is en waar je voorkeur naar uit gaat.</p>
								<p className="settings-text">Wat is je geslacht? <span className={userData.gender === 'male' ? 'settings__pickstatus--on' : 'settings__pickstatus--off'} onClick={this.setMaleHandler.bind(this)}>man</span>/<span className={userData.gender === 'female' ? 'settings__pickstatus--on' : 'settings__pickstatus--off'} onClick={this.setFemaleHandler.bind(this)}>vrouw</span></p>
								<p className="settings-text">Wie zoek je? <span className={userData.genderPreference === 'male' ? 'settings__pickstatus--on' : 'settings__pickstatus--off'} onClick={this.setPreferenceMaleHandler.bind(this)}>man</span>/<span className={userData.genderPreference === 'female' ? 'settings__pickstatus--on' : 'settings__pickstatus--off'} onClick={this.setPreferenceFemaleHandler.bind(this)}>vrouw</span>/<span className={userData.genderPreference === 'bi' ? 'settings__pickstatus--on' : 'settings__pickstatus--off'} onClick={this.setPreferenceBiHandler.bind(this)}>maakt niet uit</span></p>
								<div className="verderbutton" onClick={this.buttonNext.bind(this)}>Verder</div>
							</div>
						)
    	} else if (this.state.view == 4) {
    		var userData = this.state.userData; 

    			{/* Als profielSet is false, dan Settings anders ga naar Tinder */}
						return (
							<div className="settings">
								<NavBar settingsmode={true}/>
								<h1>Je e-mailadres?</h1>
								<p className="settings-text">Om je op de hoogte te brengen van een match, willen we je graag mailen.</p>
								<p className="settings-text">We gebruiken je mailadres uitsluitend voor het versturen van notificaties over nieuwe matches en delen je mailadres niet met derden.</p>
								<input className="settings__emailinput" placeholder="jouw@emailadres.nl" value={userData.email} onChange={this.handleEmailChange.bind(this)}></input>
								<div className="verderbutton" onClick={this.buttonNext.bind(this)}>Verder</div>
							</div>
						)
    	} else if (this.state.view == 5) {
    		var userData = this.state.userData; 

    			{/* Als profielSet is false, dan Settings anders ga naar Tinder */}
						return (
							<div className="settings">
								<NavBar settingsmode={true}/>
								<h1>Omschrijf jezelf</h1>
								<p className="settings-text">Wat verwacht je van een afspraakje tijdens een Tegenlicht Meet Up en wie ben je? Kijk je elke week VPRO Tegenlicht of ben je meer een zondagskijker?</p>
								<textarea className="settings__profileinput" rows="6" cols="60" type="text" placeholder="Gebruik maximaal 200 tekens om jezelf te omschrijven voor potentiële matches." value={this.state.userData.profile.profileText} onChange={this.handleProfileChange.bind(this)}></textarea>
								<div className="verderbutton" onClick={this.buttonNext.bind(this)}>Verder</div>
							</div>
						)
    	} else if (this.state.view == 6) {
    		var userData = this.state.userData; 

    			{/* Als profielSet is false, dan Settings anders ga naar Tinder */}
						return (
							<div className="settings">
								<NavBar settingsmode={true}/>
								<h1>Tegenlicht meet-up</h1>
								<p className="settings-text">Ik ga <span className={userData.profile.tegenlichtMeetup == 'niet' ? 'settings__pickstatus--on' : 'settings__pickstatus--off'} onClick={this.setMeetupNietHandler.bind(this)}>niet</span>/
									<span className={userData.profile.tegenlichtMeetup == 'misschien' ? 'settings__pickstatus--on' : 'settings__pickstatus--off'} onClick={this.setMeetupMisschienHandler.bind(this)}>misschien</span>/
									<span className={userData.profile.tegenlichtMeetup == 'zeker' ? 'settings__pickstatus--on' : 'settings__pickstatus--off'} onClick={this.setMeetupZekerHandler.bind(this)}>zeker</span> naar een Tegenlicht meetup</p>
								
								<p className={userData.profile.tegenlichtMeetup == 'niet' ? 'settings-text settings-text--off' : 'settings-text settings-text--on'}>{userData.profile.tegenlichtMeetup == 'zeker' ? 'Ik ga zeker naar:' : 'Ik ga misschien naar:'}</p>

								<RadioGroup name="meetupLocatie" selectedValue={this.state.userData.profile.tegenlichtLocatie} onChange={this.setTegenlichtLocatieHandler.bind(this)}>
								  {Radio => (
								    <div className={userData.profile.tegenlichtMeetup == 'niet' ? 'meetupLocs meetupLocs--off' : 'meetupLocs meetupLocs--on'}>
								      <label><Radio value="amsterdam" />Amsterdam (Pakhuis de Zwijger, 17 feb)</label><br/>
								      <label><Radio value="amersfoort" />Amersfoort (Stadslab033, 17 feb)</label><br/>
								      <label><Radio value="vlaardingen" />Vlaardingen (KADE40, 17 feb)</label><br/>
								      <label><Radio value="nijmegen" />Nijmegen (DROOMvillaLUX, 18 feb)</label><br/>
								      <label><Radio value="rotterdam" />Rotterdam (Venture Cafe, 18 feb)</label><br/>
								      <label><Radio value="groningen" />Groningen (De Wolkenfabriek, 18 feb)</label><br/>
								      <label><Radio value="zwolle" />Zwolle (Club Cele, 23 feb)</label><br/>
								      <label><Radio value="delft" />Delft (Lijm & Cultuur, 24 feb)</label><br/>
								      <label><Radio value="haarlem" />Haarlem (Pletterij, 24 feb)</label><br/>
								      <label><Radio value="den bosch" />Den Bosch (RUW, 25 feb)</label><br/>
								      <label><Radio value="eindhoven" />Eindhoven (Oude Rechtbank, 9 mrt)</label>
								    </div>
								  )}
								</RadioGroup>

								<div className="verderbutton" onClick={this.buttonNext.bind(this)}>Verder</div>
							</div>
						)
    	} else if (this.state.view == 'tinder') {
    		var userData = this.state.userData; 
	        return (
	        	<div className="app-container">
	        		{ this.checkEndOfUsers() }
	    			<nav>
		    			<div onClick={this.clickInnersettings.bind(this)} className="nav__like"><span className="icon-user"></span></div>
		    			<div onClick={this.clickTinder.bind(this)} className="nav__logo"><img className="nav__tinderlichtlogo" src={tinderlicht} /></div>
		    			<div onClick={this.clickMutualLike.bind(this)} className="nav__loves"><span className="icon-heart-header"></span></div>
		    		</nav>
	        		  <div className="profileContainer">
			        		<Profile 
			        			profileId={this.state.profilesData[this.state.userData.tinderStats.currentPosition].id}
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
	    		<div className="settings">
	    			<nav>
		    			<div onClick={this.clickInnersettings.bind(this)} className="nav__like"><span className="icon-user"></span></div>
		    			<div onClick={this.clickTinder.bind(this)} className="nav__logo"><img className="nav__tinderlichtlogo" src={tinderlicht} /></div>
		    			<div onClick={this.clickMutualLike.bind(this)} className="nav__loves"><span className="icon-heart-header"></span></div>
		    		</nav>
	    				<br/>
	    			<h1>Een match</h1>
	    			<Match profileUrl={this.state.profilesData[this.state.userData.tinderStats.currentPosition].profileUrl}
	    						profileId={this.state.profilesData[this.state.userData.tinderStats.currentPosition].id} />
	    			<div className="verderbutton" onClick={this.clickNext.bind(this)}>Verder</div>
	    		</div>
	    	)
	    } else if (this.state.view == "matches") {
	    	return (
	    		<div className="settings">
	    			<nav>
		    			<div onClick={this.clickInnersettings.bind(this)} className="nav__like"><span className="icon-user"></span></div>
		    			<div onClick={this.clickTinder.bind(this)} className="nav__logo"><img className="nav__tinderlichtlogo" src={tinderlicht} /></div>
		    			<div onClick={this.clickMutualLike.bind(this)} className="nav__loves"><span className="icon-heart-header"></span></div>
		    		</nav>
	    				<br/>
	    			<p className="settings-text">Ik ga samen met een match naar de landelijke Tegenlicht Meet Up</p>
	    			<ul>
	    			{this.state.mutualLikes.map((profileIds) => {
	    				return <MutualLikes key={this.state.profilesDataObj[profileIds].id} singlePicture={this.state.profilesDataObj[profileIds].profilePhoto} singleName={this.state.profilesDataObj[profileIds].name} singleProfile={this.state.profilesDataObj[profileIds].profileUrl}/>
	    			})}	
	    			</ul>
	    		</div>
	    	)
	    } else if (this.state.view == "innersettings") {
	    	return (
	    		<div className="settings">
	    			<nav>
		    			<div onClick={this.clickInnersettings.bind(this)} className="nav__like"><span className="icon-user"></span></div>
		    			<div onClick={this.clickTinder.bind(this)} className="nav__logo"><img className="nav__tinderlichtlogo" src={tinderlicht} /></div>
		    			<div onClick={this.clickMutualLike.bind(this)} className="nav__loves"><span className="icon-heart-header"></span></div>
		    		</nav>
	    				<br/>
	    			<p className="settings-text">Klik hier om je profiel opnieuw in te stellen</p>
	    			<p className="settings-text">Wil je je account verwijderen? Mail tegenlicht@vpro.nl</p>
	    			<p className="settings-text">Wil je een e-mail opt-out? Mail tegenlicht@vpro.nl</p>
	    		</div>
	    	)
	    } else if (this.state.view == 'tinderNoMatches'){
	    	return (
	    		<div className="settings">
	    			<nav>
		    			<div className="nav__like"><span className="icon-user"></span></div>
		    			<div className="nav__logo"><img className="nav__tinderlichtlogo" src={tinderlicht} /></div>
		    			<div onClick={this.clickMutualLike.bind(this)} className="nav__loves"><span className="icon-heart-header"></span></div>
		    		</nav>
	    				<br/>
						<h1>Geen matches</h1>
	    			<p className="settings-text">Je hebt iedereen in ons bestand beoordeeld! Wie weet melden zich snel weer nieuwe mensen aan, dus kom binnenkort nog eens terug. Wie weet vind je dan je ideale match! Je kunt natuurlijk ook gewoon naar een Tegenlicht Meet Up gaan en wie weet spreek je iemand na afloop tijdens de borrel. Proost!</p>
	    		</div>
	    	);
	    }
	}
}

export default Tinderlicht;