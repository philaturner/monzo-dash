import React from 'react';
import { Form, FormGroup, Col, FormControl, Button, Alert } from 'react-bootstrap';

class LoginForm extends React.Component{
	loginHandler = () => {
		this.props.loginHandler(this.accID, this.token);
	}

	render(){
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
					<Col smOffset={3} sm={11}>
						<Button onClick={this.loginHandler}>Login</Button>
						<Button onClick={this.props.sampleHandler}>Sample Data</Button>
					</Col>
				</FormGroup>
			</Form>
			</div>
			)
		}
  }
  
export default LoginForm
