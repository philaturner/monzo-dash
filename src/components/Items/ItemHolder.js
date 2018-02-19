import React from 'react';
import Transactions from './Transactions';
import Account from '../../Summary/Account';
import Search from '../Form/Search';

class ItemHolder extends React.Component{	
	render(){
		const { transactions } = this.props.monzo_data;
		const { handleClick } = this.props;
		const { dashboard } = this.props.monzo_data;
		const { filterText, handleChange, selectedElements, removeSelected } = this.props;
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
				<Transactions 
					handleClick={handleClick}
					key={key}
					id={value.id}
					category={value.category}
					value={value.amount}
					emoji={value.emoji}
					merchant={value.merchant.length > 13 ? value.merchant.substring(0,13) + ".." : value.merchant}
				/>
			)
		})
		return(
			<div>
				<Search 
					filterText={filterText}
					handleChange={handleChange}
					selectedElements={selectedElements}
					removeSelected={removeSelected}
				/>
				<Account 
					dashboard={dashboard}
				/>
				<div className = "panel-container">
					{itemsArr}
				</div>
			</div>
		)
	}
}

export default ItemHolder