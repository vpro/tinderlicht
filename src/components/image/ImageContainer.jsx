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

        		<ul className="metadata">
	        		<li className="metatitle">TITLE</li>
	        		<li className="metadescription">Three ravens dropping a roof tile in front of the feet of Tiberius Gracchus, seen as a bad omen</li>
	        		<li className="metatitle">COUNTRY</li>
	        		<li className="metadescription">France</li>
        		</ul>
  			</div>
  		);
    }
}

export default ImageContainer;
