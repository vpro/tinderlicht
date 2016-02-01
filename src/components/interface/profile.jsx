import React from 'react';

class Profile extends React.Component{
    render() {
        console.log(this.props);
        return (
            <div className="profileContainer">
                <div className="profile">
                    <div className="profile__card">
                    <img className="profile__photo" src={this.props.profilePhoto} />
                        <span className="profile__name">{this.props.profileName}, <span className="profile__age">{this.props.profileAge}</span></span>
                        <br/>
                        <span className="profile__description">{this.props.profileText}</span>
                    </div>
                </div>
                <div>
                    <span className="icon-cross"></span>
                    <span className="icon-heart"></span>
                </div>
            </div>
        );
    }
}

export default Profile;
