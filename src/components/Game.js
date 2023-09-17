import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Board from './Board';

const Container = styled.div`
  text-align: center;
  font-family: Arial, sans-serif;
`;

const Scoreboard = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  font-size: 18px;
`;

const Score = styled.div`
  color: #007bff;
`;

const Attempts = styled.div`
  color: #ff0000;
`;

const Timer = styled.div`
  color: #00c000;
`;

const formatTimer = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

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
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    // Initialize the timer
    const interval = setInterval(() => {
      setTimer(timer + 1);
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    // Check for card matches when two cards are flipped
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;

      if (cards[firstCard.index].value === cards[secondCard.index].value) {
        // If the cards match, mark them as matched
        cards[firstCard.index].isMatched = true;
        cards[secondCard.index].isMatched = true;

        // Increase the score
        setScore(score + 1);
      } else {
        // If the cards don't match, flip them back and increase the attempts
        setTimeout(() => {
          cards[firstCard.index].isFlipped = false;
          cards[secondCard.index].isFlipped = false;
          setCards([...cards]);
          setAttempts(attempts + 1);
        }, 1000);
      }

      // Reset the flipped cards
      setFlippedCards([]);
    }
  }, [cards, flippedCards, score, attempts]);

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
    <Container>
      <h1>Memory Match Game</h1>
      <Scoreboard>
        <Score>Score: {score}</Score>
        <Attempts>Attempts: {attempts}</Attempts>
        <Timer>Timer: {formatTimer(timer)}</Timer>
      </Scoreboard>
      <Board cards={cards} onCardClick={handleCardClick} />
    </Container>
  );
};

export default Game;
