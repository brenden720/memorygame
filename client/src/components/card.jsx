import React from 'react';

const Card = props => {
  const { onCardClick } = props;
  const { card } = props.card;
  return (
    <div className={props.card.isSolved ? "cardHidden" : "card" } onClick={() => { onCardClick(card); }}>
      {card}
    </div>
  );
};

export default Card;
