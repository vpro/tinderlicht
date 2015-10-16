import React from 'react';
import request from 'superagent';

class ImageContainer extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			imgClickPosition: null
		}
	}

    render() {
    	var records = this.props.state.srw$searchRetrieveResponse.srw$records.srw$record;
    	var thumbnail = records[1].srw$recordData.srw_dc$dc.dcx$thumbnail.$t;
    	var image = records[1].srw$recordData.srw_dc$dc.dc$identifier.$t;
    	
    	var imageClickPosition = this.props.appState.imageClickPosition;

    	var divStyle;
    	if(imageClickPosition){
	    	divStyle = {
				left: (imageClickPosition.x - 50),
				top: (imageClickPosition.y - 50)
			};
		}

        return (
        	<div className="image-container" onClick={this.props.imageClicker}>
        		<div className="circle" style={divStyle}></div>
        		<img src={image} />
  			</div>
  		);
    }
}

export default ImageContainer;