import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Monzo from './Api/monzo.js';
import LoginForm from './components/Form/LoginForm';
import ItemHolder from './components/Items/ItemHolder';
import PanelText from './components/Panels/PanelText';
import PanelSummary from './components/Panels/PanelSummary';
import Transactions from './components/Items/Transactions'
import { slide as Menu } from 'react-burger-menu';

class Main extends React.Component{
	constructor(props){
		super(props);
			this.state = {
				monzo: {},
				loggedIn: false,
				filterText: "",
				selectedElements: [],
				pageRoute: "login"
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

	menuLogin(){
		console.log("login clicked")
		this.setState({
			pageRoute: "login"
		})
	}

	render() {
		const bm_styles = {
			bmBurgerButton: {
				position: 'absolute',
				width: '28px',
				height: '22px',
				right: '32px',
				top: '22px'
			},
			bmBurgerBars: {
				background: '#252E33'
			},
			bmCrossButton: {
				height: '24px',
				width: '24px'
			},
			bmCross: {
				background: '#bdc3c7'
			},
			bmMenu: {
				background: '#252E33',
				padding: '1em 1em 0',
				fontSize: '2em',
				color: "white"
			},
			bmMorphShape: {
				fill: '#373a47'
			},
			bmItemList: {
				color: '#b8b7ad',
				padding: '0.8em'
			},
			bmOverlay: {
				background: 'rgba(0, 0, 0, 0.3)'
			}
		}
		
		return(
		<div>
	 	<div className = "container">
				<div className = "right-content">
				<div className = "top-nav">
				<Menu 
						right
						styles= {bm_styles}
						outerContainerId={"top-nav"}
						width={"260px"}
					>
					{!this.state.loggedIn ? <a onClick={ this.menuLogin.bind(this) } className="menu-item--small" href="#login">Login</a>: null}
					<a id="transactions" className="menu-item" href="/">Example</a>
					<a id="analytics" className="menu-item" href="/">Example</a>
					<a id="expenses" className="menu-item" href="/">Example</a>
					<a id="contact" className="menu-item" href="/">Example</a>
		 		</Menu>
					<h1>Monzo Dashboard</h1>
					<span className = "subtext">a fun place to browse your transactions</span>
		 		</div>
						{this.state.loggedIn
						?
							<ItemHolder
								transaction_count = {this.state.transaction_count}
								monzo_data = {this.state.monzo}
								filterText = {this.state.filterText}
								selectedElements = {this.state.selectedElements}
								handleClick = {this.handleClick.bind(this)}
								handleChange = {this.handleChange.bind(this)}
								removeSelected = {this.removeSelected.bind(this)}
							/>
						:
							<div className = "panel-container">
							{this.state.pageRoute === "login" ?
								<div className = "panel-text">
								<LoginForm 
									loginHandler = {this.login.bind(this)}
									loginError = {this.state.loginError}
									sampleHandler = {this.handleSample.bind(this)}
								/>
								</div>
								:
								null
							}
							<PanelSummary 
								type="red"
								amount="£102.00"
								summary="11 transactions"
							/>
							<PanelSummary 
								type="blue"
								amount="£2.67"
								summary="Spent today"
							/>
							<PanelSummary 
								type="default"
								amount="£19.30"
								summary="Starbucks spend"
							/>
							<PanelText
								title="Welcome!"
								text="Bring a spring upon her cable main sheet hempen halter me ballast lookout league code of conduct deadlights yo-ho-ho. Handsomely jib nipperkin take a caulk execution dock lanyard pirate scallywag Brethren of the Coast swab. Hands red ensign fire ship fathom Davy Jones' Locker Nelsons folly mizzen maroon parrel boom."
								tags={["purple","blue","green"]}
								tagLabels={["I'm Purple","I'm Blue","I'm Green"]}
							/>
							<Transactions
								merchant="Just Eat"
								value={"10.03"}
								category="eating_out"
								emoji="☕"
							/>
							<Transactions 
								merchant="John Lewis"
								value={"25.00"}
								category="shopping"
								emoji="☕"
							/>
							<Transactions 
								merchant="Tesco"
								value={"4.95"}
								category="groceries"
								emoji="☕"
							/>
							</div>
						}
				</div>
			</div>
			</div>
		);
	}
}

ReactDOM.render(<Main />, document.getElementById('root'));
