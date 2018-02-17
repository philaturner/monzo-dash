import React from 'react';

class Items extends React.Component{
	render(){
		const { id, merchant, category, value, handleClick, emoji } = this.props;
		const classText = `category ${category}`;

		return(
			<div className = "panel-item emoji" id={id} onClick ={() => handleClick({ id, merchant, category, value })}>
			<div className ="icon emoji">
				<span className ="em">{emoji}</span>
			</div>
			<div className ="content">
				<span className ="amount">{merchant}</span><br />
				<span className ="transactions">£{value}</span>
				<span className={classText}>{category}</span>
			</div>
			</div>
		)
	}
}

export default Items