import React, { useState, useEffect } from 'react';
import Board from './Board';

const generateCards = () => {
  const values = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const cards = values.concat(values); // Pairs of cards

  // Shuffle the cards
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  return cards.map((value, index) => ({
    value,
    isFlipped: false,
    isMatched: false,
    index,
  }));
};

const Game = () => {
  const [cards, setCards] = useState(generateCards());
  const [flippedCards, setFlippedCards] = useState([]);
  
  useEffect(() => {
    // Check for card matches when two cards are flipped
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;

      if (cards[firstCard.index].value === cards[secondCard.index].value) {
        // If the cards match, mark them as matched
        cards[firstCard.index].isMatched = true;
        cards[secondCard.index].isMatched = true;
      }
      
      // Reset the flipped cards
      setFlippedCards([]);
    }
  }, [cards, flippedCards]);
  
  const handleCardClick = (index) => {
    // If the card is already matched or two cards are already flipped, do nothing
    if (cards[index].isMatched || flippedCards.length === 2) {
      return;
    }

    // Flip the card
    cards[index].isFlipped = true;
    setCards([...cards]);

    // Add the flipped card to the list
    setFlippedCards([...flippedCards, cards[index]]);
  };
  
  return (
    <div>
      <h1>Memory Match Game</h1>
      <Board cards={cards} onCardClick={handleCardClick} />
    </div>
  );
};

export default Game;
