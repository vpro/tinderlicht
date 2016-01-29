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

		handleChange(event, state){
			console.log(event.target.value);

			this.setState(function(event, state){
				state.userData.profile.favoriteEpisode = event.target.value;
			}, this.fireproof.update({[this.state.userData.id]: this.state.userData}));
  	}

  	goToTinder(event){
			this.setState({view: 'tinder'});
		}

    render() {
    	var userData = this.props.userData; 
    	var profile = userData.profile; 
    	var profileText = userData.profile.profileText;

    	return (
			<div className="profileSetup">
				<h2>Welkom {userData.name}!</h2>
				{ /* <img src={userData.profilePhoto} /> */ }
					<br />
				<p>Vul aan:</p>
				<textarea type="text" value={profileText} onChange={this.handleChange.bind(this)}/>
					<br />
				<p>Wil je een notificatie krijgen? Vul je e-mailadres in:</p>
					<input type="text" value={profile.favoriteEpisode}  />
				<button onClick={this.goToTinder}>Verder</button>
			</div>
		);
	}
}

export default Settings;
