class FirebaseMethods {
	constructor(){
		this.initiatizeDatabase = () => {	
			this.firebaseRef = new Firebase('https://hackalod.firebaseio.com/');
		};

		this.auth = (provider, callback) => {
			this.firebaseRef.authWithOAuthPopup(provider, callback);
		};

		this.getData = (authData, callback) => {
			var uidGenerated = authData[authData.provider].id + '-' + authData.provider;
			this.firebaseRef.child(uidGenerated).on('value', callback);
		};

		this.updateFirebase = () => {
			var userData = this.state.userData;
			this.firebaseRef.update({[userData.id]: userData}, console.log('Firebase updated'));
		};
	}
}

export default FirebaseMethods;