class Login {
	constructor(){
		this.initiatizeDatabase = () => {	
			this.firebaseRef = new Firebase('https://hackalod.firebaseio.com/');
		};

		this.auth = (provider) => {
			this.firebaseRef.authWithOAuthPopup(provider);
		};

		this.getData = (authData, callback) => {
			console.log('getData', this)
			this.firebaseRef.child(authData.uid).on('value', callback);
		};

		this.updateFirebase = () => {
			var userData = this.state.userData;
			this.firebaseRef.update({[userData.id]: userData}, console.log('Firebase updated'));
		};
	}
}

export default Login;