import React from 'react';
import request from 'superagent';

class ImageContainer extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			lodData: null
		}
	}
	componentDidMount() {
    	var lodURL = 'http://lod.kb.nl/rce/A30FCAFC-A206-4F2B-84CB-9CB2232E8B85?output=application/ld+json';
    	var callback = function(err, res){
    		var parsedRes = JSON.parse(res.text);
    		this.setState({lodData: parsedRes})
    	}.bind(this);
    	request
    		.get(lodURL)
	    	.end(callback);
	}
    render() {
        return (
        	<div>Images</div>
  		);
    }
}

export default ImageContainer;
