import React from 'react';
import Firebase from 'firebase';

import ImageContainer from './game/ImageContainer.jsx';
import ImageMetadata from './game/ImageMetadata.jsx';
import ImageTagging from './game/ImageTagging.jsx';

import FirebaseMethods from './logic/FirebaseMethods.js';

import Iconclass from './game/Iconclass.jsx';
import Sidebar from './sidebar/Sidebar.jsx';
import Navigation from './navigation/Navigation.jsx';

import logoIntro from '../assets/icons/logoblauwrood.png';

import data from '../assets/data/handschriften.json';
import iconClass from '../assets/data/iconclass/iconclassDump.json';
import Model from '../assets/data/model.jsx';

class HackingHistorians extends React.Component{
	constructor(props){
		super(props);
		this.firebaseMethods = new FirebaseMethods();
		this.state = {
			verluchtingen: data,
			appState: {
				imageClickPosition: null,
				currentIconclass: "45353",
				betrayed: 0,
				userAction: 1
			},
			view: 'auth',
			authData: null,
			userData: null
		}
	}

	componentWillMount(){
		this.firebaseMethods.initiatizeDatabase();
	}

	setView(view){
		this.setState({view: view});
	}

	determineIconclass() {
		var userData = this.state.userData;
    	var records = this.state.verluchtingen.srw$searchRetrieveResponse.srw$records.srw$record;
    	var iconclassArray = records[this.state.userData.gameData.position].srw$recordData.srw_dc$dc.dc$subject;
    	var currentIconclass = {$t: 0};
    	var betray = Math.round((Math.random()/1.50));

    	if (betray) {
    		currentIconclass = {"$t": "57AA6142"};
    	} else {
    		if (!Array.isArray(iconclassArray)){
    			if (iconclassArray.$t){
    				currentIconclass = iconclassArray;
    			} else {
    				currentIconclass = {"$t": "51AA4"};
    			}
	    	} else if (Array.isArray(iconclassArray)){
	    		var selectedIconclass = Math.round(Math.random() * (iconclassArray.length - 1));
	    		currentIconclass = iconclassArray[selectedIconclass];
	    	}
	    }

	    if (currentIconclass.$t != 0){
			currentIconclass.text = iconClass[currentIconclass.$t];
	    } else {
	    	alert('no match!');
	    }

    	this.setState(function(state){
    		state.appState.currentIconclass = currentIconclass;
    		state.appState.betrayed = betray;
    	});
	}

	buttonClicker(event) {
		event.persist();
		event.preventDefault();
		console.log('button clickec');
		this.setState(function(state){
			state.appState.historyItem = {};
			state.appState.historyItem.userAction = 0;
			return state;
		}, this.clickProcessor);
	}

	imageClicker(event) {
		event.persist();
		this.setState(function(state){
			state.appState.historyItem = {};
			state.appState.historyItem.x = event.pageX - event.target.parentNode.offsetLeft;
			state.appState.historyItem.y = event.pageY - event.target.parentNode.offsetTop;
			state.appState.historyItem.userAction = 1;
			return state;
		}, this.clickProcessor);
	}

	clickProcessor(){
		this.setState(function(state){
			state.appState.historyItem.betrayed = state.appState.betrayed;
			state.appState.historyItem.iconclass = state.appState.currentIconclass.$t;
			
			state.userData.gameData.history[sstate.userData.gameData.position] = state.appState.historyItem;
			
			if (state.appState.betrayed == state.appState.userAction) {
				state.userData.gameData.score -= 10;
			} else {
				state.userData.gameData.score += 10;
			}

			var totalItems = this.state.verluchtingen.srw$searchRetrieveResponse.srw$records.srw$record.length;

			if ((totalItems-1) <= state.userData.gameData.position){
				this.setView('endGame');
			}

			state.userData.gameData.position++;

			return state;
		}, this.updateFirebase);
	}





	login(error, authData) {
		this.setState({authData: authData}, console.log('login',this.state))
		this.firebaseMethods.getData(authData, this.userCheck.bind(this));
	}

	userCheck(userData) {
		// If new user:
		if (userData.val() == null){
			console.log('creating new account');
			let newAccount = new Model.User(uidGenerated, authData[provider].displayName || "");
			console.log(newAccount);
			this.setState(
				function(state){
					state.userData = newAccount;
					return state;
				}, this.updateFirebase);
			this.setView('game');
		} else {
			this.setState({userData: userData.val()} );
			var totalItems = this.state.verluchtingen.srw$searchRetrieveResponse.srw$records.srw$record.length;
			if ((totalItems-1) <= this.state.userData.gameData.position){
				this.setView('endGame');
			} else {
				this.setView('game');
			}
			this.determineIconclass();
		}
	}






    render() {
    	if (this.state.view == 'auth'){
    		return (
    			<div className="app-container">
    				<div className="auth-container">
    					<img className="logoIntro" src={ logoIntro } />
    					<span className="auth-button facebook"> 
    						<span>Start</span>
    						<button className="auth-sm icon-facebook" onClick={this.firebaseMethods.auth.bind(this, 'facebook', this.login.bind(this))}></button>
    						<button className="auth-sm icon-twitter"  onClick={this.authWithFirebase.bind(this, 'twitter')}></button>
    						<button className="auth-sm icon-google"  onClick={this.authWithFirebase.bind(this, 'google')}></button>
    					</span>
	    				<h4>Instructies</h4>
	    				<ul className="instructies">
	 						<li>1) Klopt de Iconclass notatie met het plaatje?</li>
	 						<li>2) Zo ja; klik op de kop</li>
	 						<li>3) Nee? Druk op 'Staat er niet op'</li>
							<li>4) Scoor punten</li>
	 					</ul>
    				</div>
    			</div>
    		);
    	} else if (this.state.view == 'game'){
    		var userData = this.state.userData; 
	        return (
	        	<div className="app-container">
	        		<Sidebar verluchtingen={this.state.verluchtingen} userData={userData}/>
	        		<Navigation />
	        		<div className="game-container">
	        			<div className="interaction-container">
	        				<Iconclass verluchtingen={this.state.verluchtingen} appState={this.state.appState} userData={userData} buttonClicker={this.buttonClicker.bind(this)}/>
		        			<ImageContainer verluchtingen={this.state.verluchtingen} appState={this.state.appState} userData={userData} imageClicker={this.imageClicker.bind(this)}/>
		        		</div>
		        		<div className="metadata-container">
		        			<ImageMetadata />
		        			<ImageTagging />
		        		</div>
		        	</div>
	        	</div>
	        );
	    } else if (this.state.view == 'endGame'){
	    	return (<h1 style={{margin: "100px auto"}}> Je hebt het spel gehaald!</h1>);
	    }
	}
}

export default HackingHistorians;
