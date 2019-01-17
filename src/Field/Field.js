import React, { Component } from 'react';
// import './Field.css';

class Field extends Component {
	render() {
		var value = this.props.value;
		if(!value) {
			value = " ";
		} 

		return(
			<span className="field">{ value }</span>
		);
	}
}

export default Field;