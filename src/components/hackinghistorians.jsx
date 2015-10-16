import React from 'react';
import ImageContainer from './image/ImageContainer.jsx';
import Iconclass from './iconclass/Iconclass.jsx';

class HackingHistorians extends React.Component{
    render() {
        return (
        	<div className="app-container">
        		<ImageContainer />
        		<Iconclass />
        	</div>);
    }
}

export default HackingHistorians;
