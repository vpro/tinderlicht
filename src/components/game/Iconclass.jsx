import React from 'react';

class Iconclass extends React.Component{
    render() {
    	if (this.props.appState.currentIconclass.text){
    		var text = this.props.appState.currentIconclass.text;
    	} else {
    		var text = "Sorry, this classification isn't human readable: " + this.props.appState.currentIconclass.$t;
    	}

    	return (
			<div className="iconclass-container">
				<h3 className="waaris-kop">Staat de kop in het plaatje?</h3>
				<button className="geenhit-button" onClick={this.props.buttonClicker}>Of niet?</button>
		   	 	<p className="iconclass">{text}</p>
			</div>
		);
	}
}

export default Iconclass;
