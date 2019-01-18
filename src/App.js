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
        <header className="header"> 
          <div className='score-wrap'>
            <div className='score'>
              <span className='score__title'>Current</span>
              <span className='score__count'>{this.currentCount || 0}</span>
            </div>
            <div className='score'>
              <span className='score__title'>Best</span>
              <span className='score__count'>{this.bestCount || 0}</span>
            </div>
          </div>  

          <button className='btn'>New Game</button>
        </header>
        

        <GameBoard setScore={ this.getScore }></GameBoard> 
      </div>
    );
  }
}

export default App;
