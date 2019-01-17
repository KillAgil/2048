import React, { Component } from 'react';
import Field from '../Field/Field.js';
// import './GameBoard.css';

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
		var x = 0,
				y = 0;
		return (
			<div className='game-board'>
				{
					this.state.fields.map(() => {

						return this.state.fields.map(() => {

								return <Field key={ x + '.' + y }
													value={ this.state.fields[x][y] }
													x={ x++ }
													y={ x == 3 ? y++ : y}/>
								})
					}) 
				}
			</div>
		);
	}
}

export default GameBoard;