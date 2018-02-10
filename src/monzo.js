import balanceJSON from './example-data/balance.json'
import transJSON from './example-data/trans.json'

export default class Monzo {
	constructor(){
		this.dashboard = {};
		this.transactions = {};
		this.parseTransactions();
		this.setBalance();
		this.setSpendToday();
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
					merchant: value.merchant ? value.merchant.name : "Misc",
					amount: parseFloat(Math.round(Math.abs(value.amount) * 100) / 10000).toFixed(2),
					id: value.id,
					search_string: ""
				}
				this.transactions[transCounter].search_string = this.transactions[transCounter].category + this.transactions[transCounter].merchant + this.transactions[transCounter].amount;
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
		this.dashboard.spend_today = parseFloat(Math.round(Math.abs(data.spend_today) * 100) / 10000).toFixed(2);
	}
}