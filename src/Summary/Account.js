import React from 'react';

class Account extends React.Component{
  render(){
    const { dashboard } = this.props;
    return(
      <div className="panel-container">
        <div className = "panel-item red">
        <div className ="icon red">
        </div>
        <div className ="content">
          <span className ="amount"><strong>£{dashboard.transaction_total_value}</strong></span><br />
          <span className ="transactions">{dashboard.transaction_count} transactions</span>
        </div>
      </div>
      <div className = "panel-item blue">
        <div className ="icon blue">
        </div>
        <div className ="content">
          <span className ="amount"><strong>£{dashboard.spend_today}</strong></span><br />
          <span className ="transactions">Spent today</span>
        </div>
      </div>
      <div className = "panel-item default">
        <div className ="icon default">
        </div>
        <div className ="content">
          <span className ="amount"><strong>£143.80</strong></span><br />
          <span className ="transactions">Starbucks spend</span>
        </div>
      </div>
    </div>
    )
  }
}

export default Account