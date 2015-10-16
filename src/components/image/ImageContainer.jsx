import React from 'react';
import request from 'superagent';

class ImageContainer extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			imgClickPosition: null
		}
	}
	imageClicker(event) {
		event.persist();
		console.log(event);
		console.log("x", event.pageX - event.target.parentNode.offsetLeft);
		console.log("y", event.pageY - event.target.parentNode.offsetTop);
		this.setState(
			{'imgClickPosition': {
				x: event.pageX - event.target.parentNode.offsetLeft,
				y: event.pageY - event.target.parentNode.offsetTop
		}})
	}

    render() {
    	var records = this.props.state.srw$searchRetrieveResponse.srw$records.srw$record;
    	var thumbnail = records[1].srw$recordData.srw_dc$dc.dcx$thumbnail.$t;
    	var image = records[1].srw$recordData.srw_dc$dc.dc$identifier.$t;
    	var divStyle = null;

    	if(this.state.imgClickPosition){
	    	var divStyle = {
				left: (this.state.imgClickPosition.x - 50),
				top: (this.state.imgClickPosition.y - 50)
			};
		}

		console.log(divStyle);

        return (

        	<div className="image-container" onClick={this.imageClicker.bind(this)}>
        		<div className="circle" style={divStyle}></div>
        		<img src={image}  />
  			</div>
  		);
    }
}

export default ImageContainer;
