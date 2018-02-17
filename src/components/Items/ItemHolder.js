import React from 'react';
import Items from './Items';

class ItemHolder extends React.Component{	
	render(){
		const { transactions } = this.props.monzo_data;
		const { handleClick } = this.props;
		const { dashboard } = this.props.monzo_data;
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
					emoji={value.emoji}
					merchant={value.merchant.length > 13 ? value.merchant.substring(0,13) + ".." : value.merchant}
				/>
			)
		})
		return(
			<div>
				<div className = "panel-container">
				<div className = "panel-item red">
								<div className ="icon red">
								</div>
								<div className ="content">
									<span className ="amount">£{dashboard.transaction_total_value}</span><br />
									<span className ="transactions">{dashboard.transaction_count} transactions</span>
								</div>
							</div>
							<div className = "panel-item blue">
								<div className ="icon blue">
								</div>
								<div className ="content">
									<span className ="amount">£{dashboard.spend_today}</span><br />
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
					{itemsArr}
				</div>
			</div>
		)
	}
}

export default ItemHolder