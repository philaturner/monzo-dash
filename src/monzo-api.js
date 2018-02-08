import testJson from './test.json'

export default class MonzoAPI {
	constructor(){
		this.data = testJson;
	}

	setBalance = () => {
		this.balance = this.data.balance/100;
	}

	setSpendToday = () => {
		this.spend_today = Math.abs(this.data.spend_today)/100;
	}
}