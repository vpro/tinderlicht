import React from 'react';
import request from 'superagent';

class Iconclass extends React.Component{
    render() {
    	var records = this.props.state.srw$searchRetrieveResponse.srw$records.srw$record
    	var iconclassArray = records[1].srw$recordData.srw_dc$dc.dc$subject;
		
		return (
			<div className="iconclass-container">
				<h3>Iconclass numbers:</h3>
				{iconclassArray.map((value, index) => {
					return (
			       	 	<p key={index} className="iconclass">{value.$t}</p>
					)
				})}
			</div>
		)
    }
}

export default Iconclass;
