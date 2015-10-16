import React from 'react';
import iconClass from '../../data/iconclass/datakeys2.json';

class Iconclass extends React.Component{
    render() {
        var userData = this.props.userData;
    	var records = this.props.state.srw$searchRetrieveResponse.srw$records.srw$record
    	var iconclassArray = records[userData.gameData.position].srw$recordData.srw_dc$dc.dc$subject;
		
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

export default Iconclass;
