import React from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';

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

export default Search