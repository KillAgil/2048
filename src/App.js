import React, { Component } from 'react';
import GameBoard from './GameBoard/GameBoard.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentCount: 0, 
      bestCount: 0,
    };

    this.getScore = this.getScore.bind(this);
  }

  getScore(score) {
    console.log('App - getScore');
  }

  render() {
    return (
      <div className="App">

        <div className='score-wrap'>
          <div className='score current-score'>
            <span className='score__title'>Best</span>
            <span className='score__count'>{this.currentCount}</span>
          </div>
          <div className='score best-score'>
            <span className='score__title'>Current</span>
            <span className='score__count'>{this.bestCount}</span>
          </div>
        </div>  

        <button className='btn btn__ng-game'>New Game</button>

        <GameBoard setScore={ this.getScore }></GameBoard> 
      </div>
    );
  }
}

export default App;
