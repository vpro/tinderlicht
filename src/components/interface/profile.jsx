import React from 'react';
import Tinderlicht from '../Tinderlicht.jsx';

class Profile extends React.Component{
  componentWillMount(){
    { /* this.props.firstPosFunc.bind(this); */ }
  }


  render() {
    console.log(this.props);
    return (
      <div className="profile">
        <div className="profile__card">
        <img className="profile__photo" src={this.props.profilePhoto} />
          <span className="profile__name">{this.props.profileName}, <span className="profile__age">{this.props.profileAge}</span></span>
          <br/>
          <span className="profile__description">{this.props.profileText}</span>
        </div>
      </div>
    );
  }
}

export default Profile;
