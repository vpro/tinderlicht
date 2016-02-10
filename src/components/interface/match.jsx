import React from 'react';

class Match extends React.Component{
  render() {
    if(this.props.profileId.charAt(0) === 'f'){
      var socialMediaVerb = "bevrienden";
      var socialMediaCommunication = "de chatfunctie van Facebook";
      var socialMediaType = "Facebook";
    } else {
      var socialMediaVerb = "volgen";
      var socialMediaCommunication = "een DM op Twitter";
      var socialMediaType = "Twitter";
    }
    console.log(this.props);
  return (
      <p className="settings-text">Jullie zijn een match! Je kan de ander {socialMediaVerb} via <a href={this.props.profileUrl}>{socialMediaType}</a>. Je kan dan via {socialMediaCommunication} met elkaar in gesprek komen. Besluiten jullie om samen naar de landelijke Tegenlicht Meet Up in Pakhuis de Zwijger te gaan, dan kun je dat ons via de mail laten weten. Voor de eerste 10 koppels is een romantisch tafeltje met 2 glaasjes rode wijn gereserveerd.</p>
    );
  }
}

export default Match;
