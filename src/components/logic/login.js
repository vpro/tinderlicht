import Firebase from 'firebase';
import Fireproof from 'fireproof';
import SecureFireproof from '../utils/SecureFireproof.js';
import Promise from 'bluebird';
import TinderlichtConfig from '../utils/config.js';

import Model from '../../assets/data/model.jsx';

function login(provider) {
	// Start firebase and Fireproof
	this.firebase = new Firebase( TinderlichtConfig.firebase.server );
	this.secureFireproof = new SecureFireproof( TinderlichtConfig.backend.server );
	Fireproof.bless(Promise);
	this.fireproof = new Fireproof(this.firebase);
	this.setState = Promise.promisify(this.setState);

	console.log(this.firebase);

	// Start the login process
	// http://stackoverflow.com/questions/27870370/authwithoauthpopup-doesnt-work-on-mobile
	this.fireproof.authWithOAuthPopup(provider,
		function(error, authData) {
			  if (error) {
			    console.log("Login Failed!", error);
			  } else {
			    // the access token will allow us to make Open Graph API calls (kan weg)
			    console.log(authData.facebook.accessToken);
			  }
			}, {
			  scope: "email" // the permissions requested
			})
		// Set the retrieved authData to the state
		.then((authData)=>{
			return this.setState((state)=>{
				state.authData = authData;
				console.log(state.authData);
				return state;
			});
		})
		// Get the userData from firebase
		// TODO: use secureFireproof
		.then((authData)=>{
			return this.secureFireproof.child( encodeURIComponent( this.state.authData.uid ) )
		})
		// Set the retrieved userData to the state
		.then((userData)=>{
			return this.setState((state)=>{debugger
				state.userData = userData;
				console.log(state.userData);
				return state;
			});
		})
		// Check the user and create new account if needed
		.then(Promise.method(()=>{
			if ( ! this.state.userData ) {
				if (this.state.authData.provider === 'facebook') {
					return (new Model.User(this.state.authData.uid, this.state.authData[this.state.authData.provider].cachedUserProfile.first_name, this.state.authData[this.state.authData.provider].cachedUserProfile.gender, this.state.authData[this.state.authData.provider].cachedUserProfile.picture.data.url, this.state.authData[this.state.authData.provider].cachedUserProfile.link, (Math.floor(Date.now() / 1000)), this.state.authData[this.state.authData.provider].email || ""));
				} else {
					return (new Model.User(this.state.authData.uid, this.state.authData[this.state.authData.provider].cachedUserProfile.name, 'male', this.state.authData[this.state.authData.provider].cachedUserProfile.profile_image_url, 'http://www.twitter.com/' + this.state.authData[this.state.authData.provider].username, (Math.floor(Date.now() / 1000)), null || ""));
				}
			} else {
				// for security reasons emailadress is not exposed through the database call so add this through the authData
				this.state.userData.email = this.state.authData[this.state.authData.provider].email || "";
				return this.state.userData;
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
		// Finaly set the view

		.then(this.setView.bind(this,1));
}

export default login;