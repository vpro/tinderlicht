import React from 'react';
import iconClass from '../../data/iconclass/datakeys2.json';

class Iconclass extends React.Component{
    render() {
        var userData = this.props.userData;
    	var records = this.props.state.srw$searchRetrieveResponse.srw$records.srw$record
    	var iconclassArray = records[userData.gameData.position].srw$recordData.srw_dc$dc.dc$subject;
		
    	var trowDice = Math.round(Math.random());
    	console.log(trowDice);

		if (iconclassArray && !Array.isArray(iconclassArray)){
			return (
				<div className="iconclass-container">
					<h3 className="waaris-kop">Waar is?</h3>
					<span>Of niet?</span>
		       	 	<p className="iconclass">{iconClass[iconclassArray.$t]}</p>
				</div>
			)
		} else {

			return (
				<div className="iconclass-container">
					<h3 className="waaris-kop">Waar is?</h3>
					{ iconclassArray.map((value, index) => {
						return (
				       	 	<p key={index} className="iconclass">{iconClass[value.$t]}</p>
						)})
					}
				</div>
			)
		}
    }
}

export default Iconclass;
