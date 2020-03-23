import React from 'react';
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
		console.log("Reading all....")
		fetch("http://localhost:9000/fruitAPI/getAll")
			.then(res => res.body)
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
				<p>
					{ this.state.fruitResponse }
				</p>
			</div>
		);
	}
}

export default App;
