import balanceJSON from './balance.json'
import transJSON from './trans.json'

export default class MonzoAPI {
	constructor(){
		this.data = balanceJSON;
	}

	setBalance = () => {
		this.balance = this.data.balance/100;
	}

	setSpendToday = () => {
		this.spend_today = Math.abs(this.data.spend_today)/100;
	}

	setTransCount = () => {
		let rawTransactions = transJSON;
		let counter = 0;
		Object.entries(rawTransactions.transactions).forEach(([key, value]) => {
			if(value.include_in_spending) counter++;
		});
		this.transaction_count = counter;
	}

	setTotalTransValue = () => {
		let rawTransactions = transJSON;
		let total = 0;
		Object.entries(rawTransactions.transactions).forEach(([key, value]) => {
			if(value.include_in_spending) total += (Math.abs(value.amount)/100)
		});
		this.transaction_total_value = total;
	}
}