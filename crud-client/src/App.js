import React from 'react';
import './App.css';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fruitResponse: "",
			newName: "",
			newWeight: "",
			newRemoveId: -1,
		};
		this.readAllFruits = this.readAllFruits.bind(this);
		this.onChangeName = this.onChangeName.bind(this);
		this.onChangeWeight = this.onChangeWeight.bind(this);
		this.onChangeRemoveId = this.onChangeRemoveId.bind(this);
		this.onSubmitNewFruit = this.onSubmitNewFruit.bind(this);
		this.onSubmitRemoveId = this.onSubmitRemoveId.bind(this);
	}

	readAllFruits() {
		console.log("Reading all....")
		fetch("http://localhost:9000/fruitAPI/getAll")
			.then(res => res.text())
			.then(res => this.setState({ fruitResponse: res }));
	}

	onChangeWeight(event) {
		this.setState({ newWeight: event.target.value });
	}

	onChangeName(event) {
		this.setState({ newName: event.target.value });
	}

	onChangeRemoveId(event) {
		this.setState({ newRemoveId: event.target.value });
	}

	onSubmitNewFruit(event) {
		event.preventDefault();
		console.log("Time to add new fruit: ");
		console.log("Name: " + this.state.newName);
		console.log("Weight: " + this.state.newWeight);

		fetch("http://localhost:9000/fruitAPI/addNew",
			{
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					weight: this.state.newWeight,
					name: this.state.newName,
				})
			}
		);
	}

	onSubmitRemoveId(event) {
		event.preventDefault();
		console.log("Removing id ", this.state.newRemoveId);

		fetch(
			"http://localhost:9000/fruitAPI/delete/" + this.state.newRemoveId.toString(),
			{
				method: 'DELETE', 
			}
		)
		.then(res => res.text())
		.then(res => console.log(res));
	}

	render() {
		return (
			<div>
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
				<div>
					<form>
						<div>
							<label>Name: </label>
							<input
								type="text"
								id="name"
								name="name"
								value={this.state.newName}
								onChange={this.onChangeName}
							/>
						</div>
						<div>
							<label>Weight: </label>
							<input
								type="int"
								id="weight"
								name="name"
								value={this.state.newWeight}
								onChange={this.onChangeWeight}
							/>
						</div>
						<div>
							<input type="submit"
								onClick = { this.onSubmitNewFruit }
								value="Submit new fruit"
							/>
						</div>
					</form>
				</div>
				<div>
					<div>
						<p>Remove fruit with id</p>
					</div>
					<form>
						<label>Id: </label>
						<input
							type="int"
							id="removeId"
							name="removeId"
							value={this.state.newRemoveId}
							onChange={this.onChangeRemoveId}
						/>
						<input
							type="submit"
							onClick={ this.onSubmitRemoveId }
							value="Remove specified id"
						/>
					</form>
				</div>
			</div>
		);
	}
}

export default App;
