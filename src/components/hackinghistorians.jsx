import React from 'react';
import ImageContainer from './image/ImageContainer.jsx';
import Iconclass from './iconclass/Iconclass.jsx';
import data from '../data/handschriften.json';

class HackingHistorians extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			verluchtingen: data
		}
	}
    render() {
        return (
        	<div className="app-container">
        		<ImageContainer state={this.state.verluchtingen}/>
        		<Iconclass state={this.state.verluchtingen}/>
        	</div>);
    }
}

export default HackingHistorians;
