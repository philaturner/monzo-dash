import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Form, FormGroup, Col, FormControl, Button, Alert } from 'react-bootstrap';
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
			'expenses': "#DBBA88"
		}
	}

	render(){
		const { id, merchant, category, value, handleClick } = this.props;

		const styles = {
			backgroundColor: this.colours[category]
		}

		return(
			<div className = "child-items" 
					 id={id}
					 style={styles}
					 onClick ={() => handleClick({ id, merchant, category, value })}
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
		const { handleClick } = this.props;
		const itemsArr = [];

		Object.filter = (obj, predicate) => 
    Object.keys(obj)
          .filter( key => predicate(obj[key]) )
          .reduce( (res, key) => (res[key] = obj[key], res), {} );

		const filteredTrans = Object.filter(transactions, item => {
			return item.search_string.toLowerCase().indexOf(this.props.filterText) >= 0
		})

		Object.entries(filteredTrans).reverse().forEach(([key, value]) => {
			itemsArr.push(
				<Items 
					handleClick={handleClick}
					key={key}
					id={value.id}
					category={value.category}
					value={value.amount}
					merchant={value.merchant.length > 16 ? value.merchant.substring(0,16) + "..." : value.merchant}
				/>
			)
		})
		return(
			<div>
				<div className = "item-container">
					{itemsArr}
				</div>
			</div>
		)
	}
}

class Balance extends React.Component{	
	render(){
		const { balance, spend_today, transaction_count, transaction_total_value, filterText, handleChange, selectedElements, removeSelected } = this.props;
			return(
				<div>
					<div className="account-summary">
						<h2>Summary</h2>
						<h4>Balance: £{balance}</h4>
						<h4>Spent Today: £{spend_today}</h4>
						<h4>Transactions: {transaction_count}</h4>
						<h4>Total Spent: £{transaction_total_value|0}</h4>
					</div>
					<form>
						<FormGroup
							controlId="formBasicText"
						>
						<FormControl
							type="text"
							value={filterText}
							placeholder="Filter results..."
							onChange={handleChange}
						/>
						</FormGroup>
				</form>
				<SelectedElements 
					selectedElements={selectedElements}
					removeSelected={removeSelected}
				/>
			</div>
			)
		}
	}

class SelectedElements extends React.Component{
	render(){
		const { selectedElements, removeSelected } = this.props
		const elements = selectedElements.map((id, index) => {
			return <p 
								className="selected-child" 
								key={id} 
								onClick={()=>removeSelected(index)} >
								{selectedElements[index][1]}<span>£{selectedElements[index][3]}</span>
							</p>
		})
		return(
			<div className = "selected-elements">
				<h4>Selected</h4>
				{elements}
			</div>
		)
	}
}

class LoginForm extends React.Component{
	loginHandler = () => {
		this.props.loginHandler(this.accID, this.token);
	}

	render(){
			const { loginError } = this.props
			return(
				<div className = "login-form">
				<h2>Login</h2>
				{this.props.loginError
				?
					<Alert bsStyle="danger">
						<strong>Oh no!</strong> Something went wrong - please check your details and try again.
					</Alert>
				:
					null
				} 
				<Form horizontal>
				<FormGroup controlId="formHorizontalEmail">
					<Col sm={11}>
						<FormControl type="text" 
												 inputRef={input => this.accID = input} 
												 placeholder="Acc ID" />
					</Col>
				</FormGroup>

				<FormGroup controlId="formHorizontalPassword">
					<Col sm={11}>
						<FormControl type="password" 
												 inputRef={input => this.token = input} 
												 placeholder="Token" />
					</Col>
				</FormGroup>

				<FormGroup>
					<Col smOffset={1} sm={14}>
						<Button onClick={this.loginHandler}>Login</Button>
						<Button onClick={this.props.sampleHandler}>Sample Data</Button>
					</Col>
				</FormGroup>
			</Form>
			</div>
			)
		}
	}

class Main extends React.Component{
	constructor(props){
		super(props);
			this.state = {
				monzo: {},
				loggedIn: false,
				filterText: "",
				selectedElements: []
			}
		}
	
	handleChange(e){
		e.preventDefault()
		this.setState({
			filterText: e.target.value
		})
	}

	removeSelected(e){
		this.setState({
			selectedElements: this.state.selectedElements.filter((item, i) => i !== e)
		});
	}

	handleClick(e){
		const arrItem = [e.id, e.merchant, e.category, e.value]
		const currentSelected = this.state.selectedElements.concat([arrItem])
		this.setState({
			selectedElements: currentSelected
		})
	}

	login(accID, token){
		const monzo = new Monzo();
		monzo.makeApiCall('balance', accID.value, token.value).then((result) => {
			monzo.setBalance(result.balance);
			monzo.setSpendToday(result.spend_today);
			monzo.makeApiCall('transactions', accID.value, token.value).then((result) => {
				monzo.parseTransactions(result);
				this.setState({
					loggedIn: true,
					monzo
				})
			})
		}, () => {
			this.setState({
				loginError: true
			})
		})
	}

	handleSample(){
		const monzo = new Monzo(true);
		this.setState({
			loggedIn: true,
			monzo
		})
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
					handleChange = {this.handleChange.bind(this)}
					filterText = {this.state.filterText}
					selectedElements = {this.state.selectedElements}
					removeSelected = {this.removeSelected.bind(this)}
					accID = {this.state.accID}
				/> 
				:
				<LoginForm 
					loginHandler = {this.login.bind(this)}
					loginError = {this.state.loginError}
					sampleHandler = {this.handleSample.bind(this)}
				/>
			}
			</div>
				<div className = "right-content">
				<div className = "top-nav">
					<h1>Monzo Dashboard</h1>
					<span className = "subtext">a place to view all your transactions</span>
		 		</div>
						{this.state.loggedIn
						?
							<ItemHolder 
								transaction_count = {this.state.transaction_count}
								monzo_data = {this.state.monzo}
								filterText = {this.state.filterText}
								selectedElements = {this.state.selectedElements}
								handleClick = {this.handleClick.bind(this)}
							/>
						:
							<div className = "panel-container">
							<div className = "panel-item red">
								<div className ="icon red">
								</div>
								<div className ="content">
									<span className ="amount">£1,125.00</span><br />
									<span className ="transactions">100 transactions</span>
								</div>
							</div>
							<div className = "panel-item blue">
								<div className ="icon blue">
								</div>
								<div className ="content">
									<span className ="amount">£12.50</span><br />
									<span className ="transactions">Spent today</span>
								</div>
							</div>
							<div className = "panel-item default">
								<div className ="icon default">
								</div>
								<div className ="content">
									<span className ="amount">£143.80</span><br />
									<span className ="transactions">Starbucks spend</span>
								</div>
							</div>
							<div className = "panel-text">
								<h2>Text Panel 1</h2>
								<p>Bring a spring upon her cable main sheet hempen halter me ballast lookout league code of conduct deadlights yo-ho-ho. Handsomely jib nipperkin take a caulk execution dock lanyard pirate scallywag Brethren of the Coast swab. Hands red ensign fire ship fathom Davy Jones' Locker Nelsons folly mizzen maroon parrel boom.</p>
								<div className = "tag">
									<span className="eating">eating out</span>
									<span className="groceries">groceries</span>
									<span className="entertainment">entertainment</span>
								</div>
							</div>
							<div className = "panel-text">
								<h2>Text Panel 2</h2>
								<p>Bring a spring upon her cable main sheet hempen halter me ballast lookout league code of conduct deadlights yo-ho-ho. Handsomely jib nipperkin take a caulk execution dock lanyard pirate scallywag Brethren of the Coast swab. Hands red ensign fire ship fathom Davy Jones' Locker Nelsons folly mizzen maroon parrel boom.</p>
								<div className = "tag">
									<span className="blue">github</span>
									<span className="purple">docs</span>
									<span className="green">download</span>
								</div>
							</div>
							<div className = "panel-item emoji">
								<div className ="icon emoji">
									<span className ="em">🍕</span>
								</div>
								<div className ="content">
									<span className ="amount">Just Eat</span><br />
									<span className ="transactions">£10.03</span>
									<span className="category eating">eating out</span>
								</div>
							</div>
							<div className = "panel-item emoji">
								<div className ="icon emoji">
									<span className ="em">🛍</span>
								</div>
								<div className ="content">
									<span className ="amount">John Lewis</span><br />
									<span className ="transactions">£25.00</span>
									<span className="category shopping">shopping</span>
								</div>
							</div>
							<div className = "panel-item emoji">
								<div className ="icon emoji">
									<span className ="em">🍏</span>
								</div>
								<div className ="content">
									<span className ="amount">Tesco</span><br />
									<span className ="transactions">£19.55</span>
									<span className="category groceries">groceries</span>
								</div>
							</div>
							</div>
						}
				</div>
			</div>
		);
	}
}

ReactDOM.render(<Main />, document.getElementById('root'));
