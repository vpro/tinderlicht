import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import request from 'superagent';

const position = [52.366, 4.90];

class LeafletContainer extends React.Component{
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
    	if (this.state.lodData){
			var position = [ this.state.lodData.lat, this.state.lodData.long]
		}
        return (
	        <Map className="map-container" center={position} zoom={12}>
	    		<TileLayer
	      			url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
	    		/>
	    		<Marker position={position} />
	  		</Map>
  		);
    }
}

export default LeafletContainer;
