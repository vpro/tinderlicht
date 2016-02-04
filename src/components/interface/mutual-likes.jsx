import React from 'react';

class MutualLikes extends React.Component{
  render() {
  	// console.log(this.props.shit)
  return (
      <li className="singleMutual">
      	<span className="singleMutual__photoWrap">
      		<img className="singleMutual__photo" src={this.props.singlePicture}/>
      	</span>
      	<span className="singleMutual__name">{this.props.singleName}</span>
      	<span className="singleMutual__button"><a href={this.props.singleProfile}>Ga naar profiel</a></span>
      </li>
    );
  }
}

export default MutualLikes;
