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
    var game = !this.state.game;
    this.setState({
      game: game,
    });
  }

  getScore(score) {
    console.log('App - getScore || score ', score);

    if(score === "win") {
      alert('You WINNER!!!');
    } else {
       if(this.state.game) {
        this.setState({
        currentCount: score,
        });
      } else if(!this.state.game && this.state.currentCount > this.state.bestCount) {
        var current = this.state.currentCount;

        this.setState({
          currentCount: 0,
          bestCount: current,
        });
      } else if (!this.state.game) {
        this.setState({
          currentCount: 0,
        });
      }
    }
  }

  render() {
    return (
      <div className="App">
        <header className="header"> 
          <div className='score-wrap'>
            <div className='score'>
              <span className='score__title'>Current</span>
              <span className='score__count'>{this.state.currentCount || 0}</span>
            </div>
            <div className='score'>
              <span className='score__title'>Best</span>
              <span className='score__count'>{this.state.bestCount || 0}</span>
            </div>
          </div>  

          <button className='btn' onClick={ this.handleClickGame }>New Game</button>
        </header>
        

        <GameBoard setScore={ this.getScore } endGame={this.handleClickGame} game={ this.state.game }></GameBoard> 
      </div>
    );
  }
}

export default App;
