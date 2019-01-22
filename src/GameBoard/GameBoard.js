import React, { Component } from 'react';
import Field from '../Field/Field.js';
import './GameBoard.css';

function createRandomField() {
	var fields = []; 
	var value;
	var x =  Math.floor(Math.random() * (3 - 0)) + 0;
	var y =  Math.floor(Math.random() * (3 - 0)) + 0;
	var coordinates = x+"."+y;

	if(fields[0] === coordinates) coordinates = (x-1)+"."+y ;

	(Math.random() * (100 - 1) + 1 < 90) ? value = 2 : value = 4;

	fields.push(coordinates + ';' + value);

	console.log('GameBoard - createRandomField || fields', fields);

	return fields;	
}


class GameBoard extends Component {
	test = false;
	constructor(props) {
		super(props);

		this.state = {
			ng: 0,
			fields: [ 
								[ 0, 0, 0, 0 ],
								[ 0, 0, 0, 0 ],
								[ 0, 0, 0, 0 ],
								[ 0, 0, 0, 0 ],
							],		
		};
	}

	shouldComponentUpdate() {
		console.log('GameBoard - shouldComponentUpdate || props.game && state.ng\n', this.props.game + " && " + this.state.ng);
		if(!this.props.game && !this.state.ng) {
			// "!this.props.game", because props didn't already update yet.    
			this.setState({
				ng: 1,
			});
			return false;
		}
		return true;
	}
	componentDidUpdate() {
		console.log('GameBoard - componentDidUpdate || props.game && state.ng\n', this.props.game + " && " + this.state.ng);
		var fields;

		// This look like that, because stage "shouldComponentUpdate" after press "New Game" was loopsing.  

		if (this.props.game && this.state.ng === -1) {
			// state "on"(true && -1)
			fields = createRandomField();

		} else if(this.props.game && this.state.ng === 1){
			// transition from "begin"(true && 1) to "on"(true && -1)
			fields = createRandomField();
			this.setState({
				ng: -1,
			})	
		}
	}

	arrowPress(event) {
		console.log("GameBoard - arrowPress || event.key: ", event.key);
	}

	render() {
		var x = 0;
		return (
			<table className='game-board' onKeyPress={ this.arrowPress }>
				<tbody>
						<tr className="game-board__row">
							{
								this.state.fields.map(() => {
									return <Field key={ x + '.' + 0 }
														value={ this.state.fields[x][0] }
														x={ x !== 3 ? x++ : x = 0 }
														y={ 0 }/>
								}) 
							}
						</tr>
						<tr className="game-board__row">
							{
								this.state.fields.map(() => {
									return <Field key={ x + '.' + 1 }
														value={ this.state.fields[x][1] }
														x={ x !== 3 ? x++ : x = 0 }
														y={ 1 }/>
								}) 
							}
						</tr>
						<tr className="game-board__row">
							{
								this.state.fields.map(() => {
									return <Field key={ x + '.' + 2 }
														value={ this.state.fields[x][2] }
														x={ x !== 3 ? x++ : x = 0 }
														y={ 2 }/>
								}) 
							}
						</tr>
						<tr className="game-board__row">
							{
								this.state.fields.map(() => {
									return <Field key={ x + '.' + 3 }
														value={ this.state.fields[x][3] }
														x={ x !== 3 ? x++ : x = 0 }
														y={ 3 }/>
								}) 
							}
						</tr>
				</tbody>
			</table>
		);
	}
}



export default GameBoard;