import React from 'react';
import goodIcon from '../../assets/icons/good.svg';
import falseIcon from '../../assets/icons/false.svg';

class SidebarItem extends React.Component{
    render() {
    	var userData = this.props.userData;
    	var records = this.props.verluchtingen.srw$searchRetrieveResponse.srw$records.srw$record;
    	var historyPlace = (userData.gameData.position - this.props.number);

    	if (this.props.number <= userData.gameData.position){
    		var thumbnail = records[historyPlace].srw$recordData.srw_dc$dc.dcx$thumbnail.$t;
			var divStyle = {
				background: "url(" + (thumbnail)+ ")"
			}

			var currentHistory = userData.gameData.history[historyPlace];

			if (currentHistory.betrayed == currentHistory.userAction) {
				var displayedIcon = falseIcon;
			} else {
				var displayedIcon = goodIcon;
			}

			return (
				<div className="prev-container">	
					<div className="prev-image" style={divStyle}/>
					<img className="positive-score" src={displayedIcon}/>
				</div>
			)
		} else {
			return <p></p>;
		}
    }
}

export default SidebarItem;
