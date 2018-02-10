import balanceJSON from './example-data/balance.json'
import transJSON from './example-data/trans.json'

export default class Monzo{
	constructor(){
		this.dashboard = {};
		this.transactions = {};
		this.setBalance(balanceJSON.balance);
		this.setSpendToday(balanceJSON.spend_today);
		this.parseTransactions();
	}

	getApiCallUrl = (accountId) => {
		return `https://api.monzo.com/balance?account_id=${accountId}` 
	}

	getApiHeader = (token) => {
		return {
			headers: {
				"Authorization": `Bearer ${token}`
			}
		}
	}

	makeApiCall = (accountId, token) => {
		return new Promise((resolve, reject) => {
			fetch(this.getApiCallUrl(accountId), this.getApiHeader(token))
			.then(response => {
					if (!response.ok){
							throw Error('No response')
					}
					if (response.status !== 200){
							throw Error('Failed Auth')
					}
					return response
			})
			.then(data => data.json())
			.then(data => {
				resolve(data);
			}, () => {
					reject(console.log("api call failure"));
			})
		});
	}

	setBalance = (value) => {
		this.dashboard.balance = parseFloat(Math.round(Math.abs(value) * 100) / 10000).toFixed(2);
	}

	setSpendToday = (value) => {
		this.dashboard.spend_today = parseFloat(Math.round(Math.abs(value) * 100) / 10000).toFixed(2);
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
}