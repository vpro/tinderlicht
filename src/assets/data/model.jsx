class User {
  constructor(id, name, gender, profilePhoto){
    this.id = id;
    this.name = name;
    this.gender = gender;
    this.profilePhoto = profilePhoto;
    this.gameData = new Game;
    this.tinderStats = new TinderStats;
    this.profile = new Profile;
  };
};

class Game {
  constructor(){
    this.position = 0;
    this.score = 0;
    this.history = [""];
  };
};

class TinderStats {
  constructor(){
    this.position = 0;
    this.likes = [""];
    this.dislikes = [""];
  };
};

class Profile {
  constructor(){
    this.profileSet = false;
    this.profileText = "";
    this.favoriteEpisode = "";
    this.favoriteCharacter = "";
  };
};

export default {User: User, Game: Game, TinderStats: TinderStats, Profile: Profile};


