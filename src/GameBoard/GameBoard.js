import React, { Component } from 'react';
import Field from '../Field/Field.js';
import './GameBoard.css';

class GameBoard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			fields: [ 
								[ 0, 0, 0, 0 ],
								[ 0, 0, 0, 0 ],
								[ 0, 0, 0, 0 ],
								[ 0, 0, 0, 0 ],
							],		
		};
	}

	render() {
		var x = 0;
		return (
			<table className='game-board'>
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