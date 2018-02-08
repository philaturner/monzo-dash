import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ButtonToolbar } from 'react-bootstrap';
import MonzoApi from './monzo-api.js';

class Buttons extends React.Component{
	render(){
		return(
			<div className="center">
			<ButtonToolbar>
				<button className = "btn btn-success" onClick={this.props.login}>
						Login
				</button>
				<button className = "btn btn-warning" onClick={this.props.clear}>
						Clear
				</button>
				</ButtonToolbar>
			</div>
		)
	}
}

class Main extends React.Component{
	constructor(){
		super();
			this.state = {
				monzoData: null
			}
		}

	login = () => {
		console.log('login');
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
			<h1>monzo-dash</h1>
				<Buttons
					login = {this.login}
					clear = {this.clear}
				/>
		  </div>
		);
	}
}

ReactDOM.render(<Main />, document.getElementById('root'));
