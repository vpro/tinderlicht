import React from 'react';
import ImageContainer from './image/ImageContainer.jsx';
import Iconclass from './iconclass/Iconclass.jsx';
import Sidebar from './sidebar/Sidebar.jsx';

import data from '../data/handschriften.json';

class HackingHistorians extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			verluchtingen: data,
			appState: {
				user: null,
				imageClickPosition: null
			}
		}
	}

	imageClicker(event) {
		event.persist();
		this.setState(function(state){
			var newState = state.appState.imageClickPosition =  {
				x: event.pageX - event.target.parentNode.offsetLeft,
				y: event.pageY - event.target.parentNode.offsetTop
			};
			return state;
		});
	}

    render() {
    	console.log(this.state);
        return (
        	<div className="app-container row">
        		<Sidebar />
        		<div className="game-container col-md-10">
        			<Iconclass state={this.state.verluchtingen}/>
	        		<ImageContainer state={this.state.verluchtingen} appState={this.state.appState} imageClicker={this.imageClicker.bind(this)}/>
	        	</div>
        	</div>);
    }
}

export default HackingHistorians;
