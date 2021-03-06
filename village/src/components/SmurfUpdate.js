import React, { Component } from 'react';

export default class SmurfUpdate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			age: '',
			height: '',
		};
	};

	handleInputChange = e => {
		this.setState({
			[e.target.name]: e.target.value,
		})
	};

	updateSmurf = e  => {
		e.preventDefault();

		this.props.update(this.state, this.props.match.params.id);

		this.setState({
			name: null,
			age: null,
			height: null,
		})

		this.props.history.push('/');
	};

	render() {
		return (
			<div className="SmurfUpdate">
				<form onSubmit={this.updateSmurf}>
					<input onChange={this.handleInputChange} placeholder="name" value={this.state.name} name="name" />
					<input onChange={this.handleInputChange} placeholder="age" value={this.state.age} name="age" />
					<input
						onChange={this.handleInputChange}
						placeholder="height"
						value={this.state.height}
						name="height"
					/>
					<button type="submit">Update Smurf</button>
				</form>
			</div>
		);
	}
}
