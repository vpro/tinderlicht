import React from 'react';
import Firebase from 'firebase';
import Fireproof from 'fireproof';
import SecureFireproof from './utils/SecureFireproof.js';
import TinderlichtConfig from './utils/config.js';
import Promise from 'bluebird';

import axios from 'axios';
import RadioGroup from 'react-radio-group';

import login from './logic/login.js';

import Auth from './interface/auth.jsx';
import NavBar from './interface/navbar.jsx';
import Settings from './interface/settings.jsx';
import Profile from './interface/profile.jsx';
import Match from './interface/match.jsx';
import MutualLikes from './interface/mutual-likes.jsx';

import Socialmedia from './interface/social.jsx';

import tinderlicht from '../assets/icons/tinderlicht.svg';
import Model from '../assets/data/model.jsx';


// client side variant
class Tinderlicht extends React.Component{
	constructor(props){
		super(props);
		this.login = login;
		this.state = {
			profilesData: null,
			profilesDataObj: null,
			view: 'auth',
			mutualLikes: [],
			authData: null,
			userData: null
		}
	}

	componentWillMount(){
		this.secureFireproof = new SecureFireproof( TinderlichtConfig.backend.server );
		this.secureFireproof.list().then( function( profilesData ) {

			var profilesDataObj = {};

		    if ( profilesData ) {

				profilesData.forEach( function ( profile ) {
					profilesDataObj[ profile.id ] = profile;
				});

				this.setState(function(state){
					state.profilesDataObj = profilesDataObj;
					state.profilesData = profilesData;
					return state;
				})
			}

		}.bind( this ));
	}

	checkEndOfUsers(){
	var totalProfiles = this.state.profilesData.length - 1;
		if(totalProfiles <= this.state.userData.tinderStats.currentPosition){
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
		this.checkEndOfUsers();		
	}

	registerDislike(){
		this.setState(function(state){
			let curPos = this.state.userData.tinderStats.currentPosition;
			state.userData.tinderStats.dislikes.push(state.profilesData[curPos].id);
			return state;
		}, this.updateDB)
		this.determinePosition();
	}

	registerLike(){
		this.setState(function(state){
			let curPos = this.state.userData.tinderStats.currentPosition;
			state.userData.tinderStats.likes.push(state.profilesData[curPos].id);
			return state;
		}, this.updateDB)
		this.seeIfMatch();
	}

	seeIfMatch() {
		var thisPos = this.state.userData.tinderStats.currentPosition;
		var thereIsAMatch = null;

		for(let i = 0; i < this.state.profilesData[thisPos].tinderStats.likes.length; i++){
			if(this.state.userData.id === this.state.profilesData[thisPos].tinderStats.likes[i]){
				thereIsAMatch = true;
			} else {
			}
		}

		if(thereIsAMatch === true) {

			this.setState(function(state){
				state.userData.tinderStats.numberMatches++;
				return state;
			}, this.updateDB);

			// notify the other user
			this.secureFireproof.match( this.state.profilesData[thisPos].id );

			this.setView('match');
		} else {
			this.determinePosition();
		}
	}

	initialPosition(){
		var thisPos = this.state.userData.tinderStats.currentPosition;

		//console.log('Initiele positie: Mijn voorkeur is', this.state.userData.genderPreference)
		//console.log('Initiele positie: De eerste hit is een', this.state.profilesData[thisPos].gender)

		if(this.state.userData.genderPreference === this.state.profilesData[thisPos].gender){
			//console.log('Initiele positie:  Dit was de juiste voorkeur, positie blijft bestaan')

		} else {
			this.setState(function(state){
				//console.log('Initiele positie: Niet de juiste voorkeur, eentje optellen')
				state.userData.tinderStats.currentPosition++
				return state;
			}, this.updateDB)
		}
	}

	determinePosition(){
		this.checkEndOfUsers();

		var thisPos = this.state.userData.tinderStats.currentPosition + 1;
		//console.log('Huidige positie', this.state.userData.tinderStats.currentPosition)

		if(this.state.userData.genderPreference === this.state.profilesData[thisPos].gender){
			//console.log('DP: Mijn voorkeur is', this.state.userData.genderPreference)
			//console.log('DP: Dit geslacht is', this.state.profilesData[thisPos].gender)
			this.setState(function(state){
				state.userData.tinderStats.currentPosition++
				return state;
			}, this.updateDB)
		} else if(this.state.userData.genderPreference === 'bi') { 
			this.setState(function(state){
				state.userData.tinderStats.currentPosition++
				return state;
			}, this.updateDB)
		} else {
			//console.log('DP: Mijn voorkeur is', this.state.userData.genderPreference)
			//console.log('DP: Dit geslacht is', this.state.profilesData[thisPos].gender)
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
		var userData = this.state.userData;
		var tempMutualLikes = [];

		/* Hij loopt evenlang als de lengte van mijn eigen likes */
		for (let i = 1; i < userData.tinderStats.likes.length; i++){
			var currentProf = userData.tinderStats.likes[i];
			if(_.contains(this.state.profilesDataObj[currentProf].tinderStats.likes, userData.id) === true){
				tempMutualLikes.push(currentProf);
				//console.log(tempMutualLikes);
			} else {
				//console.log('geen match');
			}
		}

		this.setState(function(state){
			state.mutualLikes = tempMutualLikes
			return state;
		})
		this.showMutualLikes();

	}

	showMutualLikes(){
		this.setView('matches');
	}

	handleAgeChange(event){
		var leeftijd = event.target.value.substring(0, 2);
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
	finalButtonNext(event){ this.goTinder() }
	setMaleHandler(event){ this.setGender('male') }
	setFemaleHandler(event){ this.setGender('female') }
	setPreferenceMaleHandler(event) { this.setPreference('male') }
	setPreferenceFemaleHandler(event) { this.setPreference('female') }
	setPreferenceBiHandler(event) { this.setPreference('bi') }

	/* Deze kunnen in theorie weg */
	setMeetupNietHandler(event) { this.setTegenlichtStatus('niet') }
	setMeetupMisschienHandler(event) { this.setTegenlichtStatus('misschien') }
	setMeetupZekerHandler(event) { this.setTegenlichtStatus('zeker') }

	setMeetupAmsterdamHandler(event) { this.setMeetupAmsterdam() }
	setMeetupAmsterdam(){
		this.setState(function(state){
			state.userData.profile.tegenlichtLocatie = 'amsterdam';
			return state;
		}, this.updateDB)	
	}

	setMeetupLokaalHandler(event) { this.setMeetupLokaal() }
	setMeetupLokaal(){
		this.setState(function(state){
			state.userData.profile.tegenlichtLocatie = 'amersfoort';
			return state;
		}, this.updateDB)	
	}

	stopSpamming(event) { this.setEmailToFalse() }

	setEmailToFalse(){
		this.setState(function(state){
			state.userData.email = '';
			return state;
		}, this.updateDB)	
	}

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
			this.setView(this.state.view+1)
		} else {
			this.setState(function(state){
				state.userData.profile.profileSet = true;
				return state;
			}, this.updateDB)	
			this.setView('tinder');
		}
	}

	goTinder(){
		this.setState(function(state){
			state.userData.profile.profileSet = true;
			return state;
		}, this.updateDB)	
		this.initialPosition();
		this.setView('tinder');
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
		return this.secureFireproof.update({[this.state.userData.id]: this.state.userData});
	}

	setView(view){
		this.setState({view: view});
	}

	componentDidMount(){
		// Hier heel shitty json uit firebase halen wrs met axios
		var profileData = {};
		var dataObj = {}
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
								<h1>Hoi <span className="oranje">{this.state.userData.name}</span>,</h1>

								<Socialmedia profileId={this.state.userData.id} />
								<div className="verderbutton" onClick={this.buttonNext.bind(this)}>Verder</div>
								{ /* http://stackoverflow.com/questions/25234101/how-to-integrate-the-twitter-widget-into-reactjs */ }

								{ /* <Settings userData={userData}/> */ }
							</div>
						)
					} else { 
						var totalProfiles = this.state.profilesData.length - 1;
						if(totalProfiles <= this.state.userData.tinderStats.currentPosition) {
							this.setView('tinderNoMatches');
						} else {
							this.setView('tinder');
						}
							return (<p>Error</p>);
					}		
    	} else if (this.state.view == 2) {
    		var userData = this.state.userData; 

    			{/* Als profielSet is false, dan Settings anders ga naar Tinder */}
						return (
							<div className="settings">
								<NavBar settingsmode={true}/>
									<h1>leeftijd</h1>
									<p className="settings-text">Om je zo goed mogelijk te kunnen matchen, willen we graag een paar gegevens van je weten. Die gebruiken we alleen om je te kunnen matchen en voor geen enkel ander doel.</p>
									<p className="settings-text">Mogen we weten hoe oud je bent?</p>
									<input type="number" onkeypress='return event.charCode >= 48 && event.charCode <= 57' min="18" max="99" placeholder="leeftijd" value={this.state.userData.profile.age} onChange={this.handleAgeChange.bind(this)}></input>
								<div className="verderbutton" onClick={this.buttonNext.bind(this)}>Verder</div>
							</div>
						)
    	} else if (this.state.view == 3) {
    		var userData = this.state.userData; 
    		    
    			{/* Als profielSet is false, dan Settings anders ga naar Tinder */}
						return (
							<div className="settings">
								<NavBar settingsmode={true}/>
								<h1>Wie zoek je?</h1>
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
								<h1>je e-mailadres?</h1>
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
								<h1>omschrijf jezelf</h1>
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
								<h1>Tegenlicht Meet Up</h1>
								<p className="settings-text">Ik ga naar <span className={userData.profile.tegenlichtLocatie == 'amsterdam' ? 'settings__pickstatus--on' : 'settings__pickstatus--off'} onClick={this.setMeetupAmsterdamHandler.bind(this)}>de landelijke Tegenlicht Meet Up in Pakhuis de Zwijger (17 februari)</span> / 
									<span className={userData.profile.tegenlichtLocatie == 'amsterdam' ? 'settings__pickstatus--off' : 'settings__pickstatus--on'} onClick={this.setMeetupLokaalHandler.bind(this)}> een lokale Tegenlicht Meet Up</span>
									</p>
								
								<p className={userData.profile.tegenlichtMeetup == 'amsterdam' ? 'settings-text settings-text--off' : 'settings-text settings-text--on'}>{userData.profile.tegenlichtLocatie == 'amsterdam' ? '' : 'Ik ga naar de lokale meet up in:'}</p>

								<RadioGroup name="meetupLocatie" selectedValue={this.state.userData.profile.tegenlichtLocatie} onChange={this.setTegenlichtLocatieHandler.bind(this)}>
								  {Radio => (
								    <div className={userData.profile.tegenlichtLocatie == 'amsterdam' ? 'meetupLocs meetupLocs--off' : 'meetupLocs meetupLocs--on'}>
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

								<div className="verderbutton" onClick={this.finalButtonNext.bind(this)}>Verder</div>
							</div>
						)
    	} else if (this.state.view == 'tinder') {
    		var userData = this.state.userData; 
	        return (
	        	<div className="app-container tinderview">
	    			<nav>
		    			<div onClick={this.clickInnersettings.bind(this)} className="nav__like"><span className="icon-user"></span></div>
		    			<div onClick={this.clickTinder.bind(this)} className="nav__logo"><img className="nav__tinderlichtlogo" src={tinderlicht} /></div>
		    			<div onClick={this.clickMutualLike.bind(this)} className="nav__loves"><span className="icon-heart-header"></span></div>
		    		</nav>
	        		  <div className="profileContainer">
			        		<Profile 
			        			profileId={this.state.profilesData[this.state.userData.tinderStats.currentPosition].id}
			        			profileName={this.state.profilesData[this.state.userData.tinderStats.currentPosition].name} 
			        			profileMeetup={this.state.profilesData[this.state.userData.tinderStats.currentPosition].profile.tegenlichtLocatie}
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
	    			<h1>een match</h1>
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
	    			<h1>matches</h1>
	    			<p className="settings-text">Ik ga samen met een match naar de landelijke Tegenlicht Meet Up.<br/><a href="mailto:charley@dezwijger.nl?subject=Ik kom samen met een match naar de Tegenlicht Meet Up&body=(Als je samen met een match aan romantisch tafeltje wil genieten van een gratis glas rode wijn dan kun je je via deze mail daarvoor aanmelden. Voor de eerste 10 koppels wordt een tafel gereserveerd. Vermeld in deze mail even je eigen naam en de naam van je match. Je ontvangt dan een mail met meer informatie.)"> Stuur e-mail</a></p>
	    			<ul>
	    			{this.state.mutualLikes.map((profileIds) => {
	    				return <MutualLikes key={this.state.profilesDataObj[profileIds].id} singlePicture={this.state.profilesDataObj[profileIds].profilePhoto} singleName={this.state.profilesDataObj[profileIds].name} singleProfile={this.state.profilesDataObj[profileIds].profileUrl}/>
	    			})}	
	    			</ul>
	    		</div>
	    	)
	    } else if (this.state.view == "innersettings") {
	    	var userId = this.state.userData.id;
	    	// var mailMessage = "http://www.google.nl";
	    	var mailMsg = "mailto:tegenlicht@vpro.nl?cc=e.van.zummeren@vpro.nl&subject=Tinderlicht account verwijderen: " + userId + "&body=Ik wil graag mijn Tinderlichtaccount verwijderen. Mijn gebruikers id is " + userId;
	    	return (
	    		<div className="settings">
	    			<nav>
		    			<div onClick={this.clickInnersettings.bind(this)} className="nav__like"><span className="icon-user"></span></div>
		    			<div onClick={this.clickTinder.bind(this)} className="nav__logo"><img className="nav__tinderlichtlogo" src={tinderlicht} /></div>
		    			<div onClick={this.clickMutualLike.bind(this)} className="nav__loves"><span className="icon-heart-header"></span></div>
		    		</nav>
	    				<br/>
	    			<h1>instellingen</h1>
	    			<p className="settings-text">Pas je profieltekst aan:</p>
	    				<textarea className="settings__profileinput zondertop" rows="6" cols="60" type="text" placeholder="Gebruik maximaal 200 tekens om jezelf te omschrijven voor potentiële matches." value={this.state.userData.profile.profileText} onChange={this.handleProfileChange.bind(this)}></textarea>
	    			<p className="settings-text">Klik <span className="noemail" onClick={this.stopSpamming.bind(this)}>hier</span> om geen e-mails meer te ontvangen.</p>
	    			<p className="settings-text">Wil je je account verwijderen? Mail <a href={mailMsg}>tegenlicht@vpro.nl</a></p>
	    		</div>
	    	)
	    } else if (this.state.view == 'tinderNoMatches'){
	    	return (
	    		<div className="settings">
	    			<nav>
		    			<div onClick={this.clickInnersettings.bind(this)} className="nav__like"><span className="icon-user"></span></div>
		    			<div onClick={this.clickTinder.bind(this)} className="nav__logo"><img className="nav__tinderlichtlogo" src={tinderlicht} /></div>
		    			<div onClick={this.clickMutualLike.bind(this)} className="nav__loves"><span className="icon-heart-header"></span></div>
		    		</nav>
	    				<br/>
						<h1>geen matches</h1>
	    			<p className="settings-text">Je hebt iedereen in ons bestand beoordeeld! Wie weet melden zich snel weer nieuwe mensen aan, dus kom binnenkort nog eens terug. Wie weet vind je dan je ideale match! Je kunt natuurlijk ook gewoon naar een Tegenlicht Meet Up gaan en wie weet spreek je iemand na afloop tijdens de borrel. Proost!</p>
	    		</div>
	    	);
	    }
	}
}

export default Tinderlicht;