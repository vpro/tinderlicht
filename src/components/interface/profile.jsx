import React from 'react';

class Profile extends React.Component{
    render() {
        return (
            <div className="profileContainer">
                <div className="profile">
                    <div className="profile__card">
                    <img className="profile__photo" src="https://s3.amazonaws.com/uifaces/faces/twitter/whale/128.jpg"/>
                        <span className="profile__name">Karel, <span className="profile__age">29</span></span>
                        <br/>
                        <span className="profile__description">Hallo ik ben Karel. Dit is mijn profiel. Hiephoi. Ik heb nog wat extra tekst nodig. Nog een paar extra zinnen. Jadieja.</span>
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
