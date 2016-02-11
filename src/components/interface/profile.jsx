import React from 'react';
import Tinderlicht from '../Tinderlicht.jsx';

class Profile extends React.Component{
  render() {
    if(this.props.profileId.charAt(0) === 'f'){
      var trimId = this.props.profileId;
      trimId = trimId.substring(9, 100);
      var profPhoto = "http://graph.facebook.com/v2.5/" + trimId + "/picture?width=400"  
    } else {
      var profPhoto = this.props.profilePhoto;
    }

    var profStyle = {
      backgroundImage: 'url(' + profPhoto + ')',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };

    return (
      <div className="profile" style={profStyle}>
        <div className="profile__card">
          <span className="profile__name">{this.props.profileName}, <span className="profile__age">{this.props.profileAge}</span></span>
          <span className="profile__meetup">meet up<br/>{this.props.profileMeetup}</span>
          <br/>
          <span className="profile__description">{this.props.profileText}</span>
        </div>
      </div>


    );
  }
}

export default Profile;
