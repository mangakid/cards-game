import React, {useEffect, useState} from 'react';
import { Card, drawCardsFromDeck, getNewShuffledDeckID } from '../apis/cards-api';
import {CardImage, CardsWrapper, CardWrapper} from './CardGame.styles';

function CardGame() {
  const [isDrawingCard, setIsDrawingCard] = useState(false);
  const [deckID, setDeckID] = useState<string | undefined>(''); 
  const [dealtCards, setDealtCards] = useState<Card[]>([]);
  const [remaining, setRemaining] = useState<number | undefined>(undefined);
  const [suitCount, setSuitCount] = useState(0);
  const [valueCount, setValueCount] = useState(0);
  const previousCard: Card | undefined = dealtCards.length >= 2 ? dealtCards[dealtCards.length -2] : undefined;
  const currentCard: Card | undefined = dealtCards.length ? dealtCards[dealtCards.length -1] : undefined;

  // fetch a new shuffled deck of cards
  useEffect(() => {
    getNewShuffledDeckID().then(response => {
      const { deckID, remaining } = response || {};
      setRemaining(remaining);
      setDeckID(deckID);
    });
  }, []);

  // Check for matching suits and values
  useEffect(()=> {
    if(dealtCards.length <2 || !previousCard || !currentCard) return;
    if(previousCard.suit === currentCard.suit) {
      setSuitCount((suitCount) => suitCount +1);
    }
    if(previousCard.value === currentCard.value) {
      setValueCount((valueCount)=> valueCount +1);
    }
  },[dealtCards, currentCard, previousCard])

  const drawCard = () => {
    setIsDrawingCard(true);
    if(!remaining || !deckID) return;
    drawCardsFromDeck(deckID).then((data) => {
      const { card, remaining } = data || {};
      if(card) {
        setDealtCards([...dealtCards, card]);
        setRemaining(remaining);
      }
    }).finally( () => setIsDrawingCard(false));
  }
  
  const shouldHideButton = !remaining && !dealtCards.length;

  return (
    <div>
      {previousCard && currentCard?.value === previousCard?.value ? <div>SNAP VALUE!</div> : null}
      {previousCard && currentCard?.suit === previousCard?.suit ? <div>SNAP SUIT!</div> : null}
      <CardsWrapper>
        <CardWrapper>{previousCard ? <CardImage src={previousCard.image} /> : null} </CardWrapper>
        <CardWrapper>{currentCard ? <CardImage src={currentCard.image} />  : null }</CardWrapper>
      </CardsWrapper>
      {remaining}
      {shouldHideButton ? null: <button disabled={!remaining || !deckID || isDrawingCard} onClick={drawCard}>Draw card</button>}
      {!remaining && dealtCards.length ? 
      <>
        <div>value matches: {valueCount}</div>
        <div>suit matches: {suitCount}</div>
      </> : null
    }
      
    </div>
  );
}

export default CardGame;
