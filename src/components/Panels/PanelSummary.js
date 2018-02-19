import React from 'react';

class PanelSummary extends React.Component{
  render(){
  const { type, amount, summary } = this.props
    return(
      <div className = {`panel-item ${type}`}>
      <div className ={`icon ${type}`}>
      </div>
      <div className ="content">
        <span className ="amount"><strong>{amount}</strong></span><br />
        <span className ="transactions">{summary}</span>
      </div>
    </div>
    )
  }
}

export default PanelSummary
