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
      <p className="noMatch">Jullie zijn een match! Je kan de ander {socialMediaVerb} via <a href={this.props.profileUrl}>{socialMediaType}</a>. Je kan dan via {socialMediaCommunication} met elkaar in gesprek komen. Als jullie besluiten om samen naar de Tegenlicht Meet Up te gaan, dan kan je ons dat via <a href="http://tegenlicht.vpro.nl" target="_blank">deze speciale aanmeldpagina</a> laten weten. We reserveren dan een tafeltje voor je en jullie krijgen allebei een gratis glaasje wijn!</p>
    );
  }
}

export default Match;
