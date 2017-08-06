import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './flexField.css';

export default class FlexField extends Component {
	constructor(props) {
		super(props);
		this.updateText = this.updateText.bind(this);
		this.toggleMode = this.toggleMode.bind(this);
		this.onChange = this.onChange.bind(this);
		this.state = {
			isEditable: this.props.isEditable,
			text: this.props.text,
		}
	}
	
	onChange(event) {
		this.updateText(event.target.value);
		if(this.props.onChange) {
			this.props.onChange(event.target.value);
		}
	}
	
	toggleMode(){
		this.setState({isEditable: !this.state.isEditable})
	}
	
	updateText(newValue){
		this.setState({text: newValue});
	}
	
	render () {
		return (
			this.state.isEditable ?
				<form onSubmit={(e) => {e.preventDefault();this.toggleMode()}}>
					<input
						type='text'
						defaultValue={this.state.text}
						onChange={this.onChange}
					/>
				</form>
				:
				<div onClick={()=>this.toggleMode()}>{this.state.text}</div>
		)
	}
}
FlexField.defaultProps = {
	isEditable: false,
}
FlexField.propTypes = {
	isEditable: PropTypes.bool,
	text: PropTypes.string.isRequired,
}