import React from 'react';
import goodIcon from '../../icons/good.svg';

class SidebarItem extends React.Component{
    render() {
    	console.log(this.props);
    	var userData = this.props.userData;
    	var records = this.props.verluchtingen.srw$searchRetrieveResponse.srw$records.srw$record;
    	var thumbnail = records[userData.gameData.position].srw$recordData.srw_dc$dc.dcx$thumbnail.$t;
		return (
		<div>	
			<img className="prev-image" src={thumbnail}/>
			<img className="goed" src={goodIcon}/>
		</div>
		)
    }
}

export default SidebarItem;
