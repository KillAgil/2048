import React, { Component } from 'react';
import Field from '../Field/Field.js';
import './GameBoard.css';

function createRandomField() {
	var field = []; 
	var value;
	var x =  Math.floor(Math.random() * (3 - 0)) + 0;
	var y =  Math.floor(Math.random() * (3 - 0)) + 0;

	(Math.random() * (100 - 1) + 1 < 90) ? value = 2 : value = 4;

	field.push(x, y, value);

	console.log('GameBoard - createRandomField || fields', field);

	return field;	
}

function handlePressArrow(e) {
	if(this.props.game && this.state.ng === -1 && e.key.indexOf("Arrow") === 0) {
		console.log("GameBoard - handlePressArrow || e.key: ", e.key);
		var newFields = this.state.fields.concat();
		moveFields(e.key, newFields);

		this.setState({
			fields: newFields,
		});
	} else {
		console.log("GameBoard - handlePressArrow __ good try )");
	}
}


function moveFields(direction, fields) {
	var current, i, j, c, wasSwap;
// Somebody can think about this!!! I can do this with sorting support !!!
	if(direction === 'ArrowUp'){
		for(i = 3; i >= 0; i--) {
			for(j = 3; j >= 0; j--){
				wasSwap = false;
				for(c = j-1; c >= 0; c--){
					if(fields[i][j] && !fields[i][c]){
						current = fields[i][j];
						fields[i][j] = 0;
						fields[i][c] = current;
					} else {
						wasSwap = true;
					}
				}
				if(!wasSwap) break;
			}
		}
	} 
	else if(direction === 'ArrowDown') {
		for(i = 0; i <= 3; i++) {
			for(j = 0; j <= 3; j++){
				wasSwap = false;
				for(c = j+1; c <= 3; c++){
					if(fields[i][j] && !fields[i][c]){
						current = fields[i][j];
						fields[i][j] = 0;
						fields[i][c] = current;
					} else {
						wasSwap = true;
					}
				}
				if(!wasSwap) break;
			} 
		}
	} else if(direction === 'ArrowRight') {
		for(i = 0; i <= 3; i++) {
			for(j = 0; j <= 3; j++){
				wasSwap = false;
				for(c = j+1; c <= 3; c++){
					if(fields[j][i] && !fields[c][i]){
						current = fields[j][i];
						fields[j][i] = 0;
						fields[c][i] = current;
					} else {
						wasSwap = true;
					}
				}
				if(!wasSwap) break;
			} 
		}
	} else {
		for(i = 3; i >= 0; i--) {
			for(j = 3; j >= 0; j--){
				wasSwap = false;
				for(c = j-1; c >= 0; c--){
					if(fields[j][i] && !fields[c][i]){
						current = fields[j][i];
						fields[j][i] = 0;
						fields[c][i] = current;
					} else {
						wasSwap = true;
					}
				}
				if(!wasSwap) break;
			}
		}
	}
}
class GameBoard extends Component {
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
		handlePressArrow = handlePressArrow.bind(this);

		document.addEventListener('keydown', handlePressArrow);
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

		if(this.props.game && this.state.ng === 1){
			// transition from "begin"(true && 1) to "on"(true && -1)
			var fields = this.state.fields.concat();
			var first = createRandomField();
			var second = createRandomField();

			if(first[0] === second[0] && first[1] === second[1]) {
				second[0]--;
			}

			fields[first[0]][first[1]] = first[2];
			fields[second[0]][second[1]] = second[2];

			console.log(fields);
			this.setState({
				ng: -1,
				fields: fields,
			});	
		}
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