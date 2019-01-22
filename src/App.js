import React, { Component } from 'react';
import GameBoard from './GameBoard/GameBoard.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentCount: 0, 
      bestCount: 0,
      game: false,
    };
    this.handleClickGame = this.handleClickGame.bind(this);
    this.getScore = this.getScore.bind(this);
  }

  handleClickGame() {
    console.log('App - handleClickGame');

    this.setState({
      game: true,
    });
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

          <button className='btn' onClick={ this.handleClickGame }>New Game</button>
        </header>
        

        <GameBoard setScore={ this.getScore } game={ this.state.game }></GameBoard> 
      </div>
    );
  }
}

export default App;
