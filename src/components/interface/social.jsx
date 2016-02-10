import React from 'react';


class Twitter extends React.Component{
  render() {
  	let url = "http://tegenlicht.vpro.nl"
    return (
    	<div>
    	  <a href="https://twitter.com/vprotegenlicht"
    className="twitter-follow-button"
    data-show-count="false"
    data-show-screen-name="false"
  >Volg ons op Twitter
  </a>
 			</div>
    );
  }
}

export default Twitter;