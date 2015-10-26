import React from 'react';
import ReactDOM from 'react-dom';
import mockupimg from '../../assets/icons/mockcircle.png';


class GridBox extends React.Component{
		componentDidMount() {
			var width = ReactDOM.findDOMNode(this.refs.gridwidth).offsetWidth;
			console.log(width);
		}
    	render() {
			if(this.props.show === true){
				return (
        			<div className="gridbox" refs="gridwidth">
        				<img className="circle-img" src={mockupimg} />
        			</div>
        		)
			} else { 
				return (
					<div className="gridbox" refs="gridwidth"></div>
				)
			}	
    }
}

export default GridBox;
