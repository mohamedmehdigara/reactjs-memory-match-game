import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${(props) => (props.isFlipped ? '#fff' : '#007bff')};
  color: ${(props) => (props.isFlipped ? '#007bff' : '#fff')};
  border: 2px solid #000;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  cursor: pointer;
  user-select: none;
  transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out;
  transform: ${(props) => (props.isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)')};
`;

const Card = ({ value, isFlipped, onClick }) => {
  return (
    <CardContainer isFlipped={isFlipped} onClick={onClick}>
      {isFlipped ? value : ''}
    </CardContainer>
  );
};

export default Card;
