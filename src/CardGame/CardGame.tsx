import React, { useState, useEffect } from "react";
import { CardGameHeader } from "./CardGame.Header/CardGame.Header";
import { CardGameFooter } from "./CardGame.Footer/CardGame.Footer";
import { CardImage, CardsWrapper, CardWrapper } from "./CardGame.styles";
import {
  Card,
  drawCardsFromDeck,
  getNewShuffledDeckID,
} from "../apis/cards-api";

function CardGame() {
  const [isDrawingCard, setIsDrawingCard] = useState(false);
  const [deckID, setDeckID] = useState<string | undefined>("");
  const [dealtCards, setDealtCards] = useState<Card[]>([]);
  const [remainingCards, setRemainingCards] = useState<number | undefined>(
    undefined
  );
  const [suitCount, setSuitCount] = useState(0);
  const [valueCount, setValueCount] = useState(0);
  const previousCard: Card | undefined =
    dealtCards.length >= 2 ? dealtCards[dealtCards.length - 2] : undefined;
  const currentCard: Card | undefined = dealtCards.length
    ? dealtCards[dealtCards.length - 1]
    : undefined;

  // fetch a new shuffled deck of cards
  useEffect(() => {
    getNewShuffledDeckID().then((response) => {
      const { deckID, remaining } = response || {};
      setRemainingCards(remaining);
      setDeckID(deckID);
    });
  }, []);

  // Check for matching suits and values
  useEffect(() => {
    if (dealtCards.length < 2 || !previousCard || !currentCard) return;
    if (previousCard.suit === currentCard.suit) {
      setSuitCount((suitCount) => suitCount + 1);
    }
    if (previousCard.value === currentCard.value) {
      setValueCount((valueCount) => valueCount + 1);
    }
  }, [dealtCards, currentCard, previousCard]);

  const drawCard = () => {
    if (!remainingCards || !deckID) return;
    setIsDrawingCard(true);
    drawCardsFromDeck(deckID)
      .then((data) => {
        const { card, remaining } = data || {};
        if (card) {
          setDealtCards((dealtCards) => [...dealtCards, card]);
          setRemainingCards(remaining);
        }
      })
      .finally(() => setIsDrawingCard(false));
  };

  return (
    <div>
      <CardGameHeader
        doesValueMatch={
          !!(previousCard && currentCard?.value === previousCard?.value)
        }
        doesSuitMatch={
          !!(previousCard && currentCard?.suit === previousCard?.suit)
        }
      />
      <CardsWrapper>
        <CardWrapper>
          {previousCard && (
            <CardImage
              alt={`previous-card ${
                previousCard ? `${previousCard.value} ${previousCard.suit}` : ""
              }`}
              src={previousCard.image}
            />
          )}
        </CardWrapper>
        <CardWrapper>
          {currentCard && !isDrawingCard ? (
            <CardImage
              alt={`current-card ${
                currentCard ? `${currentCard.value} ${currentCard.suit}` : ""
              }`}
              src={currentCard.image}
            />
          ) : null}
        </CardWrapper>
      </CardsWrapper>
      <CardGameFooter
        onButtonClick={drawCard}
        isButtonDisabled={!remainingCards || isDrawingCard}
        valueCount={valueCount}
        suitCount={suitCount}
        shouldShowTally={!!(!remainingCards && dealtCards.length)}
      />
    </div>
  );
}

export default CardGame;
