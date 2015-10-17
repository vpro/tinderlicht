import React from 'react';
import goodIcon from '../../icons/good.svg';

class SidebarItem extends React.Component{
    render() {
    	var userData = this.props.userData;
    	var records = this.props.verluchtingen.srw$searchRetrieveResponse.srw$records.srw$record;
    	var thumbnail = records[(userData.gameData.position - this.props.number)].srw$recordData.srw_dc$dc.dcx$thumbnail.$t;
		
		var divStyle = {
			background: "url(" + (thumbnail)+ ")"
		}

		return (
		<div className="prev-container">	
			<div className="prev-image" style={divStyle}/>
			<img className="positive-score" src={goodIcon}/>
		</div>
		)
    }
}

export default SidebarItem;
