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
			newUpdateId: -1,
			newUpdateName: "",
			newUpdateWeight: -1
		};
		this.readAllFruits = this.readAllFruits.bind(this);
		this.onSubmitNewFruit = this.onSubmitNewFruit.bind(this);
		this.onSubmitRemoveId = this.onSubmitRemoveId.bind(this);
		this.onSubmitUpdateId = this.onSubmitUpdateId.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	readAllFruits() {
		console.log("Reading all....")
		fetch("http://localhost:9000/fruitAPI/getAll")
			.then(res => res.text())
			.then(res => this.setState({ fruitResponse: res }));
	}

	onChange(event) {
		this.setState({ [event.target.name]: event.target.value })
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

	onSubmitUpdateId(event) {
		event.preventDefault();
		console.log("Updating id", this.state.newUpdateId);

		fetch(
			"http://localhost:9000/fruitAPI/update/" + this.state.newUpdateId.toString(),
			{
				method: 'PUT',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: this.state.newUpdateName,
					weight: this.state.newUpdateWeight
				})
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
								name="newName"
								value={this.state.newName}
								onChange={this.onChange}
							/>
						</div>
						<div>
							<label>Weight: </label>
							<input
								type="int"
								id="weight"
								name="newWeight"
								value={this.state.newWeight}
								onChange={this.onChange}
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
							name="newRemoveId"
							value={this.state.newRemoveId}
							onChange={this.onChange}
						/>
						<input
							type="submit"
							onClick={ this.onSubmitRemoveId }
							value="Remove specified id"
						/>
					</form>
				</div>
				<div>
					<p>Update fruit with id</p>
					<form>
						<div>
							<label>New name: </label>
							<input
								type="text"
								name="newUpdateName"
								value={this.state.newUpdateName}
								onChange={this.onChange}
							/>
						</div>
						<div>
							<label>New weight: </label>
							<input
								type="int"
								name="newUpdateWeight"
								value={this.state.newUpdateWeight}
								onChange={this.onChange}
							/>
						</div>
						<div>
							<label>Id: </label>
							<input
								type="int"
								id="updateId"
								name="newUpdateId"
								value={this.state.newUpdateId}
								onChange={this.onChange}
							/>
							<input
								type="submit"
								onClick={ this.onSubmitUpdateId }
								value="Update specified id"
							/>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default App;
