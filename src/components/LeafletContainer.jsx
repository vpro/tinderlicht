import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

const position = [52.366, 4.90];

class LeafletContainer extends React.Component{
    render() {
        return (
	        <Map className="map-container" center={position} zoom={12}>
	    		<TileLayer
	      			url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
	    		/>
	  		</Map>
  		);
    }
}

export default LeafletContainer;
