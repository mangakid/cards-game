import axios from "axios";

export interface Card {
  code: string;
  image: string; 
  images: {
    svg: string; 
    png: string;
  }, 
  value: string; 
  suit: string;
}

const BASE_URL = "https://deckofcardsapi.com/api/deck";

const handleErrors = (error: string) => {
  console.error(error);
}

interface NewDeckData {
  success: true;
  deck_id: string;
  shuffled: boolean;
  remaining: number;
}

export const getNewShuffledDeckID = (deckCount = 1) => {
  return axios
    .get<NewDeckData>(`${BASE_URL}/new/shuffle/?deck_count=${deckCount}`)
    .then(({ data }) => {
      const { deck_id, remaining } = data;
      return ({ deckID: deck_id, remaining});
    })
    .catch(handleErrors);
};

type DeckID = string;

interface CardsData {
  success: boolean, 
  deck_id: string, 
  cards: [Card]; 
  remaining: number;
}

export const drawCardsFromDeck = (deckID: DeckID, count = 1) => {
  return axios.get<CardsData>(`${BASE_URL}/${deckID}/draw/?count=${count}`).then(({ data }) => {
    return ({ card: data.cards[0], remaining: data.remaining });
  }).catch(handleErrors);
};
