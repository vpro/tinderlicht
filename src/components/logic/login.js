import Firebase from 'firebase';
import Fireproof from 'fireproof';
import Promise from 'bluebird';

import Model from '../../assets/data/model.jsx';

function login(provider) {
	// Start firebase and Fireproof
	this.firebase = new Firebase('https://hackalod.firebaseio.com/');
	Fireproof.bless(Promise);
	this.fireproof = new Fireproof(this.firebase);
	this.setState = Promise.promisify(this.setState);

	// Start the login process
	this.fireproof.authWithOAuthPopup(provider)
		// Set the retrieved authData to the state
		.then((authData)=>{
			return this.setState((state)=>{
				state.authData = authData;
				return state;
			});
		})
		// Get the userData from firebase
		.then((authData)=>{return this.fireproof.child(this.state.authData.uid).on('value')})
		// Set the retrieved userData to the state
		.then((userData)=>{
			return this.setState((state)=>{
				state.userData = userData;
				return state;
			});
		})
		// Check the user and create new account if needed
		.then(Promise.method(()=>{
			if (this.state.userData.val() == null) {
				return (new Model.User(this.state.authData.uid, this.state.authData[this.state.authData.provider].displayName || ""));
			} else {
				return this.state.userData.val();
			}
		}.bind(this)))
		// Update the state with the new user or the same user
		.then((userData)=>{
			return this.setState((state)=>{
				state.userData = userData;
				return state;
			});
		})
		// Update Firebase with the current info
		.then(this.updateDB.bind(this))
		// Finnaly set the view
		.then(this.setView.bind(this,'game'));
}

export default login;