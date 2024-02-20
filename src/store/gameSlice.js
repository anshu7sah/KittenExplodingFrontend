import { createSlice } from "@reduxjs/toolkit";

const cardDeck = [
  { type: "cat", name: "Cat Card", icon: " 😼" },
  { type: "diffuse", name: "Diffuse Card", icon: "🙅‍♂️" },
  { type: "shuffle", name: "Shuffle Card", icon: "🔀" },
  { type: "explodingKitten", name: "Exploding Kitten Card", icon: "💣" },
];

const initialState = {
  game: {
    inGame: false,
    deck: [],
    currentCard: {},
    points: 0,
    cardIsShowing: false,
    diffusecard: 0,
    leaderboard: [],
    gamewon: false,
    gameover: false,
    explodeAction: false,
  },
};

const initiatingDeckHelper = () => {
  const temp = [];
  for (let i = 0; i < 5; i++) {
    let random = Math.floor(Math.random() * 4);
    temp.push({ ...cardDeck[random], open: false });
  }
  return temp;
};
export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    initiateGame(state, action) {
      state.game.deck = [...initiatingDeckHelper()];
      state.game.gamewon = false;
      state.game.diffusecard = 0;
      state.game.explodeAction = false;
      state.game.gameover = false;
    },
    initiateDeck(state, action) {
      state.game.currentCard = action.payload;
      state.game.cardIsShowing = true;
    },
    initiateExplodingAction(state, action) {
      state.game.explodeAction = true;
    },
    setGamewon(state, action) {
      state.game.gamewon = true;
      state.game.explodeAction = false;
      state.game.diffusecard = 0;
      state.game.deck = [];
    },
    catCard(state, action) {
      state.game.deck = [...action.payload];
    },
    setDiffuseCard(state, action) {
      state.game.diffusecard += 1;
      state.game.deck = [...action.payload];
    },
    restartGame(state, action) {
      state.game.deck = [...initiatingDeckHelper()];
      state.game.gamewon = false;
      state.game.gameover = false;
      state.game.explodeAction = false;
    },
    exitGame(state, action) {
      state.game.deck = [];
      state.game.gameover = true;
      state.game.diffuseAction = false;
      state.game.diffusecard = 0;
    },
    afterDiffuse(state, action) {
      state.game.deck = [...action.payload];
      state.game.diffusecard -= 1;
    },
    endDeck(state, action) {
      state.game.currentCard = {};
      state.game.cardIsShowing = false;
    },
    endExplodingAction(state, action) {
      state.game.explodeAction = false;
    },
    cancelhandler(state, action) {
      state.game.explodeAction = false;
      state.game.gameover = false;
      state.game.gamewon = false;
      state.game.deck = [];
    },
    setLeaderBoard(state, action) {
      state.game.leaderboard = [...action.payload];
    },
    setUserPoint(state, action) {
      state.game.points = action.payload;
    },
    forNotAuthenticatedSetUserPoint(state, action) {
      state.game.points += 1;
    },
  },
});

export const {
  initiateGame,
  initiateDeck,
  initiateExplodingAction,
  setGamewon,
  catCard,
  setDiffuseCard,
  restartGame,
  exitGame,
  afterDiffuse,
  endDeck,
  endExplodingAction,
  cancelhandler,
  setLeaderBoard,
  setUserPoint,
  forNotAuthenticatedSetUserPoint,
} = gameSlice.actions;

export default gameSlice.reducer;
