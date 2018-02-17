import React from 'react';

class Tags extends React.Component{
  render(){
    const { index, value, label} = this.props
    return(
      <span key={index} className={value}>{label}</span>
    )
  }
}

export default Tags
