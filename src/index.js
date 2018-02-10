import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ButtonToolbar, Form, FormGroup, Col, ControlLabel, FormControl, Checkbox, Button } from 'react-bootstrap';
import Monzo from './monzo.js';

class Items extends React.Component{
	constructor(){
		super();
		this.colours = {
			'bills': '#50B8DD',
			'cash': '#9ABBAA',
			'eating_out': '#E64B5F',
			'entertainment': '#EB824B',
			'groceries': '#F5B946',
			'holiday': '#B882FC',
			'shopping': '#F09696',
			'transport': '#1C7890',
			'general': '#9a9a9a',
			'expenses': "#3a3a3a"
		}
	}

	render(){
		const { id, merchant, category, value } = this.props;

		const styles = {
			backgroundColor: this.colours[category]
		}

		return(
			<div className = "child-items" 
					 id={id}
					 style={styles}
					 >
				<h3>{merchant}</h3>
				<h4>{category}</h4>
				<h5>£{value}</h5>
			</div>
		)
	}
}

class ItemHolder extends React.Component{	
	render(){
		const { transactions } = this.props.monzo_data;
		const itemsArr = [];
		const merchant = "";
		Object.entries(transactions).reverse().forEach(([key, value]) => {
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
		const { balance, spend_today, transaction_count, transaction_total_value } = this.props;
			return(
				<div>
					<h2>Summary</h2>
					<h4>Balance: £{balance}</h4>
					<h4>Spent Today: £{spend_today}</h4>
					<h4>Transactions: {transaction_count}</h4>
					<h4>Total Value: £{transaction_total_value|0}</h4>
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
		let monzo = new Monzo();
		this.setState({
			loggedIn: true,
			monzo: monzo
		})
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
