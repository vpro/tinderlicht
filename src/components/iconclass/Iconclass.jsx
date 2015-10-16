import React from 'react';
import iconClass from '../../data/iconclass/datakeys.json';

class Iconclass extends React.Component{
    render() {
    	var records = this.props.state.srw$searchRetrieveResponse.srw$records.srw$record
    	var iconclassArray = records[1].srw$recordData.srw_dc$dc.dc$subject;
		
		return (
			<div className="iconclass-container">
				<h3 className="waaris-kop">Waar is?</h3>
				{iconclassArray.map((value, index) => {
					console.log(iconClass[value.$t]);
					return (
			       	 	<p key={index} className="iconclass">{value.$t}</p>
					)
				})}
			</div>
		)
    }
}

export default Iconclass;
