class User {
  constructor(id, name, gender, profilePhoto, profileUrl, date, email){
    this.id = id;
    this.name = name;
    this.gender = gender;
    this.profilePhoto = profilePhoto;
    this.profileUrl = profileUrl; 
    this.date = date;
    this.email = email;
    this.genderPreference = "female";
    this.tinderStats = new TinderStats;
    this.profile = new Profile;
  };
};

class TinderStats {
  constructor(){
    this.currentPosition = 0;
    this.numberMatches = 0;
    this.likes = [""];
    this.dislikes = [""];
  };
};

class Profile {
  constructor(){
    this.profileSet = false;
    this.profileText = "";
    this.age = "";
    this.tegenlichtMeetup = "zeker";
    this.tegenlichtLocatie = "amsterdam";
  };
};

export default {User: User, TinderStats: TinderStats, Profile: Profile};


