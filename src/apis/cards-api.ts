import axios from "axios";

enum Suits {
  HEARTS = "HEARTS",
  SPADES = "SPADES",
  CLUBS = "CLUBS",
  DIAMONDS = "DIAMONDS",
}

enum Values {
  ACE = 'ACE',
  TWO = '2',
  THREE = '3',
  FOUR = '4',
  FIVE = '5',
  SIX = '6',
  SEVEN = '7',
  EIGHT = '8',
  NINE = '9',
  TEN = '10',
  JACK = 'JACK',
  QUEEN = 'QUEEN',
  KING = 'KING',
}

type suits = keyof typeof Suits; 
type values = typeof Values; 

export interface Card {
  code: string;
  image: string; 
  images: {
    svg: string; 
    png: string;
  }, 
  value: values; 
  suit: suits;
}

export const BASE_URL = "https://deckofcardsapi.com/api/deck";

const handleErrors = (error: string) => {
  console.error(error);
}

export interface NewDeckData {
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

export interface CardsData {
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
