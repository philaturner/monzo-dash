import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Monzo from './Api/monzo.js';
import LoginForm from './components/Form/LoginForm';
import ItemHolder from './components/Items/ItemHolder';
import PanelText from './components/Panels/PanelText';
import { FormGroup, FormControl } from 'react-bootstrap';
import { VictoryPie } from 'victory';
import { slide as Menu } from 'react-burger-menu';

class Search extends React.Component{	
	render(){
		const { filterText, handleChange, selectedElements, removeSelected } = this.props;
			return(
				<div>
					<form className ="filter-input">
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
				{elements}
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
				selectedElements: [],
				pageRoute: "home"
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
							<PanelText
								title="Welcome!"
								text="Bring a spring upon her cable main sheet hempen halter me ballast lookout league code of conduct deadlights yo-ho-ho. Handsomely jib nipperkin take a caulk execution dock lanyard pirate scallywag Brethren of the Coast swab. Hands red ensign fire ship fathom Davy Jones' Locker Nelsons folly mizzen maroon parrel boom."
								tags={["purple","blue","green"]}
								tagLabels={["purple","blue","green"]}
							/>
							<div className = "panel-item red">
								<div className ="icon red">
								</div>
								<div className ="content">
									<span className ="amount">£102.00</span><br />
									<span className ="transactions">11 transactions</span>
								</div>
							</div>
							<div className = "panel-item blue">
								<div className ="icon blue">
								</div>
								<div className ="content">
									<span className ="amount">£2.50</span><br />
									<span className ="transactions">Spent today</span>
								</div>
							</div>
							<div className = "panel-item default">
								<div className ="icon default">
								</div>
								<div className ="content">
									<span className ="amount">£19.80</span><br />
									<span className ="transactions">Starbucks spend</span>
								</div>
							</div>
							<div className = "panel-text">
								<h2>Graph Panel 1</h2>
								<div className ="graph">
								<VictoryPie
									width={500}
									animate={{
										duration: 2000
									}}
									colorScale={["tomato", "orange", "gold", "cyan"]}
								  data={[
										{ x: "Eating Out", y: 75 },
										{ x: "Shopping", y: 10 },
										{ x: "Groceries", y: 39 },
										{ x: "Expenses", y: 1 }
									]}
								/>
								</div>
								<div className = "tag">
									<span className="green">pie</span>
									<span className="blue">spend</span>
									<span className="purple">month</span>
								</div>
							</div>
							<div className = "panel-item emoji">
								<div className ="icon emoji">
									<span className ="em" role="img" aria-labelledby="pizza">🍕</span>
								</div>
								<div className ="content">
									<span className ="amount">Just Eat</span><br />
									<span className ="transactions">£10.03</span>
									<span className="category eating_out">eating out</span>
								</div>
							</div>
							<div className = "panel-item emoji">
								<div className ="icon emoji">
									<span className ="em" role="img" aria-labelledby="shopping">🛍</span>
								</div>
								<div className ="content">
									<span className ="amount">John Lewis</span><br />
									<span className ="transactions">£25.00</span>
									<span className="category shopping">shopping</span>
								</div>
							</div>
							<div className = "panel-item emoji">
								<div className ="icon emoji">
									<span className ="em" role="img" aria-labelledby="apple">🍏</span>
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
			</div>
		);
	}
}

ReactDOM.render(<Main />, document.getElementById('root'));
