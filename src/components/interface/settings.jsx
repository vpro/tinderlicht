import React from 'react';
import Firebase from 'firebase';
import Fireproof from 'fireproof';

class Settings extends React.Component{
		constructor(props){
			super(props);

			this.state = { 
				profileText: null, 
				view: 'settings'
			}
		}	

		// Deze shit idealiter allemaal naar Tinderlicht.jsx
		handleChange(event, state){
			console.log(event.target.value);

			this.setState(function(event, state){
				state.userData.profile.favoriteEpisode = event.target.value;
			}, this.secureFireproof.update({[this.state.userData.id]: this.state.userData}));
  	}

    render() {
    	var userData = this.props.userData; 
    	var profile = userData.profile; 

    	return (
			<div className="profileSetup">
				<h2>Welkom {userData.name}!</h2>
				{ /* <img src={userData.profilePhoto} /> */ }
					<br />
				<p>Vul aan:</p>
				<textarea type="text" value={profile.profileText} onChange={this.handleChange.bind(this)}/>
					<br />
				<p>Wil je een notificatie krijgen? Vul je e-mailadres in:</p>
					<input type="text" value={profile.favoriteEpisode}  />
				<button onClick={this.props.goTinder}>Verder</button>
			</div>
		);
	}
}

export default Settings;
