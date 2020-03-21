import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fruitResponse: ""
		};
		this.readAllFruits = this.readAllFruits.bind(this);
	}

	readAllFruits() {
		fetch("http://localhost:9000/fruitAPI")
			.then(res => res.text())
			.then(res => this.setState({ fruitResponse: res }));
	}

  render() {
		return (
			<div>
				<button
					onClick = { this.readAllFruits }
				>
					Get API content button
				</button>
			</div>
		);
	}
}

export default App;
