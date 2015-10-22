import React from 'react';

class ImageContainer extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			imgClickPosition: null
		}
	}

    render() {
        var userData = this.props.userData;
    	var records = this.props.verluchtingen.srw$searchRetrieveResponse.srw$records.srw$record;
        var image = records[userData.gameData.position].srw$recordData.srw_dc$dc.dc$identifier.$t;
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
        		<img className="verluchting" src={image} />
  			</div>
  		);
    }
}

export default ImageContainer;
