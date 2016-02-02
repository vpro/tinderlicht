import React from 'react';

class Match extends React.Component{
  render() {
  console.log(this.props);
  return (
      <p className="noMatch">Jullie zijn een match! Je kan de ander volgen (of bevrienden) via <a href={this.props.profileUrl}>deze link</a>. Je kan dan via de chatfunctie van Facebook/via een DM op Twitter met elkaar in gesprek komen. Als jullie besluiten om samen naar de Tegenlicht Meet Up te gaan, dan kan je ons dat via <a href="http://tegenlicht.vpro.nl" target="_blank">deze speciale aanmeldpagina</a> laten weten. We reserveren dan een tafeltje voor je en jullie krijgen allebei een gratis glaasje wijn!</p>
    );
  }
}

export default Match;
