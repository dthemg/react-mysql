import React from 'react';
import './App.css';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { spacing } from '@material-ui/system';

const styleClasses = makeStyles(theme => ({
	table: {
		minWidth: 450,
		minHeight: 400,
		maxWidth: 750
	},
	root: {
		'& > *': {
      margin: theme.spacing(1),
			width: '25ch',
		},
	}
}));


class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fruitResponse: [],
			newName: "",
			newWeight: "",
			newRemoveId: "",
			newUpdateId: "",
			newUpdateName: "",
			newUpdateWeight: ""
		};
		this.readAllFruits = this.readAllFruits.bind(this);
		this.onSubmitNewFruit = this.onSubmitNewFruit.bind(this);
		this.onSubmitRemoveId = this.onSubmitRemoveId.bind(this);
		this.onSubmitUpdateId = this.onSubmitUpdateId.bind(this);
		this.renderTable = this.renderTable.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	readAllFruits() {
		console.log("Reading all....")
		fetch("http://localhost:9000/fruitAPI/getAll", { method: 'GET' })
			.then(res => res.json())
			.then(res => this.setState({ fruitResponse: res }))
			.catch(error => console.log(error, "ERROR WHEN SETTING STATE"));
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
		const styleClasses = this.props.classes;
		return (
			<Table className={styleClasses.table} aria-label="My table">
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
		);
	}

	renderNewFruitForm() {
		const styleClasses = this.props.classes;
		
		return (
			<div>
				<form className={styleClasses.root} autoComplete="off">
					<div>
						<TextField
							label="Name"
							name="newName"
							value={this.state.newName}
							onChange={this.onChange}
						/>
					</div>
					<div>
						<TextField
							label="Weight"
							name="newWeight"
							value={this.state.newWeight}
							onChange={this.onChange}
						/>
					</div>
					<div>
						<Button
							onClick = { this.onSubmitNewFruit }
							variant="contained"
							color="primary"
						>
							Add to DB
						</Button>

					</div>
				</form>
			</div>
		)
	}

	renderGetAll() {
		return (
			<div>
				<Button
					onClick = { this.readAllFruits }
					variant="contained"
					color="primary"
				>
					Get from DB
				</Button>
			</div>
		)
	}

	renderRemove() {
		return (
			<div>
				<div>
					<TextField
						label="Id"
						name="newRemoveId"
						value={this.state.newRemoveId}
						onChange={this.onChange}
					/>
				</div>
				<div>
					<Button
						onClick={ this.onSubmitRemoveId }
						variant="contained"
						color="primary"
					>
						Remove from DB
					</Button>
				</div>
			</div>
		)
	}

	renderUpdate() {
		return (
			<div>
				<form>
					<div>
						<TextField
							label="New name"
							name="newUpdateName"
							value={this.state.newUpdateName}
							onChange={this.onChange}
						/>
					</div>
					<div>
						<TextField
							label="New weight"
							name="newUpdateWeight"
							value={this.state.newUpdateWeight}
							onChange={this.onChange}
						/>
					</div>
					<div>
						<TextField
							label="Id"
							name="newUpdateId"
							value={this.state.newUpdateId}
							onChange={this.onChange}
						/>
					</div>
					<div>
						<Button
							onClick={ this.onSubmitUpdateId }
							variant="contained"
							color="primary"
						>
							Update DB
						</Button>
					</div>
				</form>
			</div>
		)
	}

	render() {
		return (
			<div>
				<h2>Create</h2>
				{ this.renderNewFruitForm() }
				<h2>Read</h2>
				{ this.renderGetAll() }
				{ this.renderTable() }
				<h2>Update</h2>
				{ this.renderUpdate() }
				<h2>Remove</h2>
				{ this.renderRemove() }
			</div>
		);
	}
}

export default withStyles(styleClasses)(App);
