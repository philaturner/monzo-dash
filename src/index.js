import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ButtonToolbar, Form, FormGroup, Col, ControlLabel, FormControl, Checkbox, Button } from 'react-bootstrap';
import Monzo from './monzo.js';

class Items extends React.Component{
	render(){
		return(
			<div className = "child-items" id={this.props.id}>
				<h3>{this.props.merchant}</h3>
				<h4>{this.props.category}</h4>
				<h5>£{this.props.value}</h5>
			</div>
		)
	}
}

class ItemHolder extends React.Component{	
	render(){
		let itemsArr = [];
		let merchant;
		Object.entries(this.props.monzo_data.transactions).forEach(([key, value]) => {
			itemsArr.push(
				<Items 
					key={key}
					category={value.category}
					value={value.amount}
					merchant={value.merchant ? value.merchant.length > 14 ? value.merchant.substring(0,14) + ".." : value.merchant : "Misc"}
				/>
			)
		})
		return(
			<div>
				<h2>Transaction Log</h2>
				<div className = "item-container">
					{itemsArr}
				</div>
			</div>
		)
	}
}

class Balance extends React.Component{
	render(){
			return(
				<div>
					<h2>Summary</h2>
					<h4>Balance: £{this.props.balance}</h4>
					<h4>Spent Today: £{this.props.spend_today}</h4>
					<h4>Transactions: {this.props.transaction_count}</h4>
					<h4>Total Value: £{this.props.transaction_total_value|0}</h4>
				</div>
			)
		}
	}

class LoginForm extends React.Component{
	render(){
			return(
				<div className = "login-form">
				<h2>Login</h2>
				<Form horizontal>
				<FormGroup controlId="formHorizontalEmail">
					<Col sm={30}>
						<FormControl type="text" placeholder="Acc ID" />
					</Col>
				</FormGroup>

				<FormGroup controlId="formHorizontalPassword">
					<Col sm={30}>
						<FormControl type="password" placeholder="Token" />
					</Col>
				</FormGroup>

				<FormGroup>
					<Col smOffset={5} sm={30}>
						<Button onClick = {this.props.loginHandler}>Login</Button>
					</Col>
				</FormGroup>
			</Form>
			</div>
			)
		}
	}

class Main extends React.Component{
	constructor(){
		super();
			this.state = {
				monzo: {},
				loggedIn: false
			}
		}

	login = () => {
		console.log('login');
		let data = new Monzo();
		data.setBalance();
		data.setSpendToday();
		this.setState({
			loggedIn: true,
			monzo: data
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
	 	<div className = "container">
		 <div className= "left-nav">
			{this.state.loggedIn
			 ?
				<Balance 
					loggedIn = {this.state.loggedIn}
					balance = {this.state.monzo.dashboard.balance}
					spend_today = {this.state.monzo.dashboard.spend_today}
					transaction_count = {this.state.monzo.dashboard.transaction_count}
					transaction_total_value = {this.state.monzo.dashboard.transaction_total_value}
				/> 
				:
				<LoginForm 
					loginHandler = {this.login}
				/>
			}
			</div>
				<div className = "right-content">
						{this.state.loggedIn
						?
							<ItemHolder 
								transaction_count = {this.state.transaction_count}
								monzo_data = {this.state.monzo}
							/>
						:
							<div className = "welcome-text">
								<h2>Yar Pirate Ipsum</h2>
								<p>Bring a spring upon her cable main sheet hempen halter me ballast lookout league code of conduct deadlights yo-ho-ho. Handsomely jib nipperkin take a caulk execution dock lanyard pirate scallywag Brethren of the Coast swab. Hands red ensign fire ship fathom Davy Jones' Locker Nelsons folly mizzen maroon parrel boom.</p>
								<p>Pillage Nelsons folly Chain Shot tack line run a rig lugger coxswain bilge water holystone. Pieces of Eight run a shot across the bow Sail ho American Main snow booty ho quarter boom squiffy. Nipper Plate Fleet hardtack topsail Gold Road boatswain pinnace barque mizzenmast gaff.</p>				
								<p>Sail ho run a shot across the bow poop deck keel fire ship Yellow Jack pressgang scallywag grog blossom bounty. Mizzen pressgang tackle cackle fruit booty Shiver me timbers lanyard Buccaneer scallywag rigging. Pinnace bring a spring upon her cable pink warp cable scallywag Letter of Marque Barbary Coast aft fire ship.</p>
						</div>
						}
				</div>
			</div>
		);
	}
}

ReactDOM.render(<Main />, document.getElementById('root'));
