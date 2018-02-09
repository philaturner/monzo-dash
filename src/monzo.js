import balanceJSON from './balance.json'
import transJSON from './trans.json'

export default class Monzo {
	constructor(){
		this.dashboard = {};
		this.transactions = {};
		this.parseTransactions();
	}

	parseTransactions= () => {
		let rawTransactions = transJSON;
		let transCounter = 0;
		let totalValue = 0;
		//loop through all transactions
		Object.entries(rawTransactions.transactions).forEach(([key, value]) => {
			if(value.include_in_spending){
				transCounter++;
				totalValue += (Math.abs(value.amount)/100)
				this.transactions[transCounter] = {
					date: value.created,
					category: value.category,
					merchant: value.merchant ? value.merchant.name : null,
					amount: (Math.abs(value.amount)/100),
					id: value.id,
					emoji: value.merchant ? value.merchant.emoji : null
				}
			}
		});
		this.dashboard.transaction_count = transCounter;
		this.dashboard.transaction_total_value = totalValue;
	}

	setBalance = () => {
		let data = balanceJSON;
		this.dashboard.balance = data.balance/100;
	}

	setSpendToday = () => {
		let data = balanceJSON;
		this.dashboard.spend_today = Math.abs(data.spend_today)/100;
	}
}