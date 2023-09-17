import React from 'react';
import styled from 'styled-components';
import Card from './Card';

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.cols}, 1fr);
  gap: 10px;
`;

const Board = ({ cards, onCardClick }) => {
  return (
    <BoardContainer cols={Math.sqrt(cards.length)}>
      {cards.map((card, index) => (
        <Card
          key={index}
          value={card.value}
          isFlipped={card.isFlipped}
          onClick={() => onCardClick(index)}
        />
      ))}
    </BoardContainer>
  );
};

export default Board;
