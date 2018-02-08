import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ButtonToolbar, Form, FormGroup, Col, ControlLabel, FormControl, Checkbox, Button } from 'react-bootstrap';
import MonzoApi from './monzo-api.js';
import MonzoAPI from './monzo-api.js';

class Buttons extends React.Component{
	render(){
		return(
			<div className="center">
			<ButtonToolbar>
				{/* <button className = "btn btn-success" onClick={this.props.login}>
						Login
				</button>
				<button className = "btn btn-warning" onClick={this.props.clear}>
						Clear
				</button> */}
				</ButtonToolbar>
			</div>
		)
	}
}

class Main extends React.Component{
	constructor(){
		super();
			this.state = {
				monzoData: {}
			}
		}

	login = () => {
		console.log('login');
		let data = new MonzoAPI();
		data.setBalance();
		data.setSpendToday();
		this.setState({
			monzoData: data,
			balance: data.balance,
			spend_today: data.spend_today 
		})
	}

	clear = () => {
		console.log('clear data');
	}

	componentDidMount(){
		console.log("mounting");
	}

	render() {
		return(
	 	<div>
			<h1>MONZO DASH</h1>
			<Form horizontal>
				<FormGroup controlId="formHorizontalEmail">
					<Col sm={30}>
						<FormControl type="text" placeholder="ID" />
					</Col>
				</FormGroup>

				<FormGroup controlId="formHorizontalPassword">
					<Col sm={30}>
						<FormControl type="password" placeholder="Token" />
					</Col>
				</FormGroup>

				<FormGroup>
					<Col smOffset={5} sm={30}>
						<Button onClick = {this.login}>Login</Button>
					</Col>
				</FormGroup>
			</Form>
			<h3>Balance: {this.state.balance}</h3>
			<h3>Spent Today: {this.state.spend_today}</h3>
		  </div>
		);
	}
}

ReactDOM.render(<Main />, document.getElementById('root'));
