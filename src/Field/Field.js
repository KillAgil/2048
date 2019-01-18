import React, { Component } from 'react';
import './Field.css';

class Field extends Component {
	render() {
		var value = this.props.value;
		if(!value) {
			value = "";
		} 

		return(
			<td className="game-board__field" value={ value }>{ value }</td>
		);
	}
}

export default Field;