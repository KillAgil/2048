import React, { Component } from 'react';
import Field from '../Field/Field.js';
import './GameBoard.css';

function createRandomField(foundField) {
	var field = foundField || []; 
	var value;

	if(!foundField) {
		var x =  Math.floor(Math.random() * (4 - 0)) + 0;
		var y =  Math.floor(Math.random() * (4 - 0)) + 0;

		field.push(x, y);
	}

	(Math.random() * (100 - 1) + 1 < 90) ? value = 2 : value = 4;

	field.push(value);

	console.log('GameBoard - createRandomField || fields', field);

	return field;	
}

function findEmptyField(fields) {
	var i, j;
	for(i = 3; i >= 0; i--) {
		for(j = 3; j >= 0; j--){
			if(!fields[i][j]) {
				return [i, j];
			}
		}
	}
	return false;
}

function calcScore(){
	var i, j,
			score = 0;
	for(i = 3; i >= 0; i--) {
		for(j = 3; j >= 0; j--){
			if(this.state.fields[i][j] === 2048) {
				return "win";
			}
			score += this.state.fields[i][j];
		}
	}
	return score; 
}

function handlePressArrow(e) {
	if(this.props.game && this.state.ng === -1 && e.key.indexOf("Arrow") === 0) {
		console.log();
		// console.log("GameBoard - handlePressArrow || oldFields", this.state.fields);
		console.log("GameBoard - handlePressArrow || e.key: ", e.key);
		var counter = 0; // temporarily
		// i am so sorry for that, but i am laziness think about it 
		var empty = true;
		var newFields = this.state.fields.concat();

		moveFields(e.key, newFields);
		var field = createRandomField();

		while(newFields[field[0]][field[1]] !== 0) {
			console.log("GameBoard - handlePressArrow || again");
			if (counter === 7) { // temporarily
				empty = findEmptyField(newFields);
				field = createRandomField(empty);
				break;
			}
			field = createRandomField();
			counter++; // temporarily
		} 

		// temporarily
		if(!empty) {
			alert('You lose'); 
			this.setState({
				ng: 0,
				fields: [ 
								[ 0, 0, 0, 0 ],
								[ 0, 0, 0, 0 ],
								[ 0, 0, 0, 0 ],
								[ 0, 0, 0, 0 ],
							],	
			});
			this.props.endGame();
		} else {
			newFields[field[0]][field[1]] = field[2];
			console.log("GameBoard - handlePressArrow || newFields", newFields);
			this.setState({
				fields: newFields,
			});
		}

		var score = calcScore();
		this.props.setScore(score);
		if(score === "win") {
			this.setState({
				ng: 0,
				fields: [ 
								[ 0, 0, 0, 0 ],
								[ 0, 0, 0, 0 ],
								[ 0, 0, 0, 0 ],
								[ 0, 0, 0, 0 ],
							],
			});
		}
	}
}

function moveFields(direction, fields) {
	var current, i, j, c, check,
			counter = [],
			elements = [], 
			skip = [];

	if(direction === 'ArrowUp'){
		for(i = 3; i >= 0; i--) {
			counter[i] = 0;
			elements = [];
			for(j = 3; j >= 0; j--){
				current = fields[j][i];
				check = elements.indexOf(current);
				if( check === -1 && current) {
					elements.push(current);
				} else if(check !== -1 && current) {
					counter[i]++;
					elements.splice(check, 1);
				}
			} 
			// console.log("i: ", i, " elements ", elements, " counter ", counter);
			(counter[i] || elements.length) ? skip[i] = false : skip[i] = true;
		}

		console.log("skip\n",skip);
		for(i = 3; i >= 0; i--) {
			if (skip[i]) {
				continue;
			}
			for(j = 3; j >= 0; j--){
				for(c = 1; c <= 3; c++){
					current = fields[c][i];
					if(current && current === fields[c-1][i] && counter[i]) {
						fields[c][i] = 0;
						fields[c-1][i] = fields[c-1][i] * 2;
						counter[i]--;
					} else if(current && !fields[c-1][i]){
						fields[c][i] = 0;
						fields[c-1][i] = current;
					}
				}
			}
		}
	} else if(direction === 'ArrowDown') {

		for(i = 0; i <= 3; i++) {
			counter[i] = 0;
			elements = [];
			for(j = 0; j <= 3; j++){
				current = fields[j][i];
				check = elements.indexOf(current);
				if( check === -1 && current) {
					elements.push(current);
				} else if(check !== -1 && current) {
					counter[i]++;
					elements.splice(check, 1);
				}
			} 
			// console.log("i: ", i, " elements ", elements, " counter ", counter);
			(counter[i] || elements.length) ? skip[i] = false : skip[i] = true;
		}

		console.log("skip\n",skip);
		for(i = 0; i <= 3; i++) {
			if (skip[i]) {
				continue;
			}
			for(j = 0; j <= 3; j++){
				for(c = 2; c >= 0; c--){
					current = fields[c][i];
					if(current && current === fields[c+1][i] && counter[i]) {
						fields[c][i] = 0;
						fields[c+1][i] = fields[c+1][i] * 2;
						counter[i]--;
					} else if(current && !fields[c+1][i]){
						fields[c][i] = 0;
						fields[c+1][i] = current;
					}
				}
			} 
		}
	} else if(direction === 'ArrowRight') {

		for(i = 0; i <= 3; i++) {
			counter[i] = 0;
			elements = [];
			for(j = 0; j <= 3; j++){
				current = fields[i][j];
				check = elements.indexOf(current);
				if( check === -1 && current) {
					elements.push(current);
				} else if(check !== -1 && current) {
					counter[i]++;
					elements.splice(check, 1);
				}
			} 
			// console.log("i: ", i, " elements ", elements, " counter ", counter);
			(counter[i] || elements.length) ? skip[i] = false : skip[i] = true;
		}
		console.log("skip\n",skip);
		for(i = 0; i <= 3; i++) {
			if (skip[i]) {
				continue;
			}
			for(j = 0; j <= 3; j++){
				for(c = 2; c >= 0; c--){
					current = fields[i][c];
					if(current && current === fields[i][c+1] && counter[i]) {
						fields[i][c] = 0;
						fields[i][c+1] = fields[i][c+1] * 2;
						counter[i]--;
					} else if(current && !fields[i][c+1]){
						fields[i][c] = 0;
						fields[i][c+1] = current;
					}
				}
			}
		}
	} else {
		for(i = 3; i >= 0; i--) {
			counter[i] = 0;
			elements = [];
			for(j = 3; j >= 0; j--){
				current = fields[i][j];
				check = elements.indexOf(current);
				if( check === -1 && current) {
					elements.push(current);
				} else if(check !== -1 && current) {
					counter[i]++;
					elements.splice(check, 1);
				}
			} 
			// console.log("i: ", i, " elements ", elements, " counter ", counter);
			(counter[i] || elements.length) ? skip[i] = false : skip[i] = true;
		}

		console.log("skip\n",skip);
		for(i = 3; i >= 0; i--) {
			if (skip[i]) {
				continue;
			}
			for(j = 3; j >= 0; j--){
				for(c = 1; c <= 3; c++){
					current = fields[i][c];
					if(current && current === fields[i][c-1] && counter[i]) {
						fields[i][c] = 0;
						fields[i][c-1] = fields[i][c-1] * 2;
						counter[i]--;
					} else if(current && !fields[i][c-1]){
						fields[i][c] = 0;
						fields[i][c-1] = current;
					} 
				}
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
		calcScore = calcScore.bind(this);
		findEmptyField = findEmptyField.bind(this);

		document.addEventListener('keydown', handlePressArrow);
	}

	shouldComponentUpdate() {
		// console.log('GameBoard - shouldComponentUpdate || props.game && state.ng\n', this.props.game + " && " + this.state.ng);

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
		// console.log('GameBoard - componentDidUpdate || props.game && state.ng\n', this.props.game + " && " + this.state.ng);

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
		} else if(!this.props.game && this.state.ng === -1) {
				this.setState({
					ng: 1,
					fields: [ 
									[ 0, 0, 0, 0 ],
									[ 0, 0, 0, 0 ],
									[ 0, 0, 0, 0 ],
									[ 0, 0, 0, 0 ],
								],	
				});
				console.log('GameBoard - shouldComponentUpdate __ endGame');
				this.props.endGame();
				return false;
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
														value={ this.state.fields[0][x] }
														x={ x !== 3 ? x++ : x = 0 }
														y={ 0 }/>
								}) 
							}
						</tr>
						<tr className="game-board__row">
							{
								this.state.fields.map(() => {
									return <Field key={ x + '.' + 1 }
														value={ this.state.fields[1][x] }
														x={ x !== 3 ? x++ : x = 0 }
														y={ 1 }/>
								}) 
							}
						</tr>
						<tr className="game-board__row">
							{
								this.state.fields.map(() => {
									return <Field key={ x + '.' + 2 }
														value={ this.state.fields[2][x] }
														x={ x !== 3 ? x++ : x = 0 }
														y={ 2 }/>
								}) 
							}
						</tr>
						<tr className="game-board__row">
							{
								this.state.fields.map(() => {
									return <Field key={ x + '.' + 3 }
														value={ this.state.fields[3][x] }
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