import React from 'react';
import Firebase from 'firebase';

import ImageContainer from './image/ImageContainer.jsx';
import Iconclass from './iconclass/Iconclass.jsx';
import Sidebar from './sidebar/Sidebar.jsx';

import data from '../data/handschriften.json';
import Model from '../data/model.jsx';

class HackingHistorians extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			verluchtingen: data,
			appState: {
				imageClickPosition: null
			},
			view: 'auth',
			userData: null,
			timeout: 0
		}
	}

	componentWillMount(){
		this.firebaseRef = new Firebase('https://hackalod.firebaseio.com/');
	}

	authWithFirebase(provider){
		var provider = provider;
		this.firebaseRef.authWithOAuthPopup(provider, function(error, authData){
		  	if (error) {
		    	console.log('Login Failed!', error);
		  	} else {
		  		this.getDataFromFirebase(authData, provider);
		  	}
		}.bind(this));
	}

	getDataFromFirebase(authData, provider){
		var authData = authData;
		var uidGenerated = authData[provider].id + '-' + provider;
		this.firebaseRef.child(uidGenerated).on('value', function(data){
				if (data.val() == null){
					console.log('creating new account');
					let newAccount = new Model.User(uidGenerated, authData[provider].displayName || "");
					console.log(newAccount);
					this.setState(
						function(state){
							state.userData = newAccount;
							return state;
						}, this.updateFirebase);
					this.setView('profile');
				} else {
					this.setState({userData: data.val()} );
					this.setView(()=> {
						if (this.state.view == 'auth') {
							return 'game';
						} else {
							return this.state.view;
						}
					}());
				}

			}.bind(this)
		);
	}

	updateFirebase(){
		// Update firebase.
		// To save connections and data only one update at a time.
		var userData = this.state.userData;
		if (this.state.timeout == 0){
			this.setState({timeout: 1});
			console.log('submitting');
			this.firebaseRef.update({[userData.id]: userData}, function(){
					console.log('database updated');
					this.setState({timeout: 0});
				}.bind(this)
			);
		}
	}

	setView(view){
		this.setState({view: view});
	}

	imageClicker(event) {
		event.persist();
		this.setState(function(state){
			state.appState.imageClickPosition =  {
				x: event.pageX - event.target.parentNode.offsetLeft,
				y: event.pageY - event.target.parentNode.offsetTop
			};
			state.userData.gameData.history[state.userData.gameData.position] = state.appState.imageClickPosition; 
			state.userData.gameData.position++;
			return state;
		}, this.updateFirebase);
	}

    render() {
    	if (this.state.view == 'auth'){
    		return (
    			<div className="app-container">
    				<div className="auth-container">
	    				<h1> You need to log in here please!!!</h1>
		  				<button className="auth-button facebook" onClick={this.authWithFirebase.bind(this, 'facebook')}>facebook</button>
    				</div>
    			</div>
    		);
    	} else if (this.state.view == 'game'){
    		var userData = this.state.userData; 
	        return (
	        	<div className="app-container">
	        		<Sidebar />
	        		<div className="game-container">
	        			<Iconclass state={this.state.verluchtingen} userData={userData}/>
		        		<ImageContainer state={this.state.verluchtingen} appState={this.state.appState} userData={userData} imageClicker={this.imageClicker.bind(this)}/>
		        	</div>
	        	</div>
	        );
	    }
	}
}

export default HackingHistorians;
