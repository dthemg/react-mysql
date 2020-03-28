import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';


class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fruitResponse: [],
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
		this.renderTable = this.renderTable.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	createData(results) {
		return { results }
	}

	useStyles() {
		return makeStyles({
			table: {
				minWidth: 650
			}
		});
	}

	readAllFruits() {
		console.log("Reading all....")
		fetch("http://localhost:9000/fruitAPI/getAll")
			.then(res => res.json())
			.then(res => this.setState({ fruitResponse: this.createData(res) }));
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

	renderTable() {
		const classes = this.useStyles();

		debugger;

		return (
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="My table">
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell align='right'>Weight</TableCell>
							<TableCell align='right'>Id</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{this.state.fruitResponse.map(rowContent => (
							<TableRow key={rowContent.id}>
								<TableCell component="th" scope="row">
									{rowContent.name}
								</TableCell>
								<TableCell align='right'>{rowContent.weight}</TableCell>
								<TableCell align='right'>{rowContent.id}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		);
	}
	

	render() {
		return (
			<div>
				{ this.renderTable() }
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
