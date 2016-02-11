import React from 'react';


class Socialmedia extends React.Component{
  render() {
    if(this.props.profileId.charAt(0) === 'f'){
      var tekst = "Om fans van het programma aan elkaar te matchen, moet je wel fan van het programma zijn. Als je VPRO Tegenlicht nog niet volgt op Facebook, dan kun je dat nu alsnog doen.";
      var atekst = "Like ons op Facebook";
      var smurl = "http://www.facebook.com/vprotegenlicht"
    } else {
      var tekst = "Om fans van het programma aan elkaar te matchen, moet je wel fan van het programma zijn. Als je @vprotegenlicht nog niet volgt op Twitter, dan kun je dat nu alsnog doen.";
      var atekst = "Volg ons op Twitter";
      var smurl = "http://www.twitter.com/vprotegenlicht"
    }

    return (
      <div>
        <p className="settings-text">{tekst}</p>
        <span><a className="socialmedia__link" href={smurl} target="_blank">{atekst}</a></span>
      </div>
    );
  }
}

export default Socialmedia;