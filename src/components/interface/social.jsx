import { FacebookButton, FacebookCount } from "react-social";
import React from 'react';


class Facebook extends React.Component{

  render() {
  	let url = "http://tegenlicht.vpro.nl"
    return (
      <FacebookButton url={url}>
        <FacebookCount url={url} />
        {" Share " + url}
      </FacebookButton>
    );
  }
}

export default Facebook;