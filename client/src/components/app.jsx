import React from 'react';
import Card from './card';
import Complete from './complete';

let cardStorage = [
  {
    card: 'A',
    isClicked: false,
    isSolved: false,
  },
  {
    card: 'C',
    isClicked: false,
    isSolved: false,
  },
  {
    card: 'B',
    isClicked: false,
    isSolved: false,
  },
  {
    card: 'D',
    isClicked: false,
    isSolved: false,
  },
  {
    card: 'C',
    isClicked: false,
    isSolved: false,
  },
  {
    card: 'B',
    isClicked: false,
    isSolved: false,
  },
  {
    card: 'D',
    isClicked: false,
    isSolved: false,
  },
  {
    card: 'F',
    isClicked: false,
    isSolved: false,
  },
  {
    card: 'A',
    isClicked: false,
    isSolved: false,
  },
  {
    card: 'F',
    isClicked: false,
    isSolved: false,
  },
  {
    card: 'G',
    isClicked: false,
    isSolved: false,
  },
  {
    card: 'G',
    isClicked: false,
    isSolved: false,
  },
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      count: 0,
      correctCount: 0,
      gameComplete: false,
      previousCard: null,
    };
    this.onCardClick = this.onCardClick.bind(this);
  }

  componentDidMount() {
    this.setState({
      ['cards']: cardStorage,
    });
  }

  onCardClick(card) {
    let { count, correctCount, previousCard } = this.state;
    let currentCount = count;
    let currentCorrectCount = correctCount;
    let prevCard = previousCard;
    if (currentCount === 0) {
      for (let i = 0; i < cardStorage.length; i++) {
        if (cardStorage[i].card === card && !cardStorage[i].isClicked) {
          cardStorage[i].isClicked = true;
          currentCount++;
          currentCorrectCount++;
          prevCard = card;
          break;
        }
      }
      this.setState({
        ['cards']: cardStorage,
        ['count']: currentCount++,
        ['correctCount']: currentCorrectCount++,
        ['previousCard']: prevCard,
      });
    } else if (currentCount === 1) {
      console.log(this.state);
        for (let i = 0; i < cardStorage.length; i++) {
          if (cardStorage[i].card === card && !cardStorage[i].isClicked && card === previousCard) {
            cardStorage[i].isClicked = true;
            currentCorrectCount++;
            break;
          }
        }      
        if (currentCorrectCount === 2) {
          currentCorrectCount = 0;
          currentCount = 0;
          const cardStorageTemp = cardStorage.map(completedCard => {
            if (completedCard.card === card) {
              return (
                {
                  card: completedCard.card,
                  isClicked: false,
                  isSolved: true,
                }
              );
            } else {
              return completedCard;
            }
          });    
          cardStorage = cardStorageTemp;
          console.log(cardStorage);
          this.setState({
            ['cards']: cardStorage,
            ['count']: currentCount,
            ['correctCount']: currentCorrectCount,
            ['previousCard']: null,
          }, () => {
              let result = this.state.cards.every(currentCard => {
                return currentCard.isSolved;
              });
              if (result) {
                result = !result;
                this.setState({
                  'gameComplete': true,
                });
              }
          });
        } else {
          currentCorrectCount = 0;
          currentCount = 0;
          const cardStorageTemp = cardStorage.map(failedCard => {
            if (!failedCard.isSolved) {
              return (
                {
                  card: failedCard.card,
                  isClicked: false,
                  isSolved: false,
                }
                );
              } else {
                return failedCard;
              }
            });
          cardStorage = cardStorageTemp;
          this.setState({
            ['cards']: cardStorage,
            ['count']: currentCount,
            ['correctCount']: currentCorrectCount,
            ['previousCard']: null,
          });
        
      }
    }
  }

  render() {
    if (this.state.gameComplete) {
      return <Complete />;
    }
    const { cards } = this.state;
    return (
      <div className="container">
        {cards.map(card => {
          return <Card card={card} onCardClick={this.onCardClick}/>;
        })}
      </div>
    );
  }
}

export default App;
