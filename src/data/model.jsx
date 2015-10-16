class User {
  constructor(id, name){
    this.id = id;
    this.name = name;
    this.gameData = new Game;
  };
};

class Game {
  constructor(id, name){
    this.position = 0;
    this.score = 0;
    this.history = [""];
  };
};

export default {User: User, Game: Game};


