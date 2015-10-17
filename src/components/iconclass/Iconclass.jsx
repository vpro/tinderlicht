import React from 'react';

class Iconclass extends React.Component{
    render() {
    	var text = "hi";
    	return (
			<div className="iconclass-container">
				<h3 className="waaris-kop">Staat de kop in het plaatje?</h3>
				<button className="geenhit-button">Of niet?</button>
		   	 	<p className="iconclass">{text}</p>
			</div>
		);
	}
}

export default Iconclass;
