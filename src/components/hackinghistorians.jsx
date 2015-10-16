import React from 'react';
import ImageContainer from './image/ImageContainer.jsx';
import Iconclass from './iconclass/Iconclass.jsx';
import data from '../data/handschriften.json';

class HackingHistorians extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			verluchtingen: data,
			appState: {
				user: null,
				clickedState: null
			}
		}
	}

	imageClicker(event) {
		event.persist();
		this.setState(
			{'imgClickPosition': {
				x: event.pageX - event.target.parentNode.offsetLeft,
				y: event.pageY - event.target.parentNode.offsetTop
		}})
	}

    render() {
        return (
        	<div className="app-container">   	
        		<ImageContainer state={this.state.verluchtingen} imageClicker={this.imageClicker}/>
        		<Iconclass state={this.state.verluchtingen}/>
        	</div>);
    }
}

export default HackingHistorians;
