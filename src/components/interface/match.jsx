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
      <p className="settings-text">Jullie zijn een match! Je kan de ander {socialMediaVerb} via <a href={this.props.profileUrl}>{socialMediaType}</a>. Je kan dan via {socialMediaCommunication} met elkaar in gesprek komen. Besluiten jullie om samen naar de landelijke Tegenlicht Meet Up in Pakhuis de Zwijger te gaan, dan kun je dat ons via <a href="mailto:charley@dezwijger.nl?subject=Ik kom samen met een match naar de Tegenlicht Meet Up&body=(Als je samen met een match aan romantisch tafeltje wil genieten van een gratis glas rode wijn dan kun je je via deze mail daarvoor aanmelden. Voor de eerste 10 koppels wordt een tafel gereserveerd. Vermeld in deze mail even je eigen naam en de naam van je match. Je ontvangt dan een mail met meer informatie.)">de mail</a> laten weten. Voor de eerste 10 koppels is een romantisch tafeltje met 2 glaasjes rode wijn gereserveerd.</p>
    );
  }
}

export default Match;
