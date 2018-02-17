import React from 'react';
import Tags from './Tags';

class PanelText extends React.Component{
	render(){
  const tagArr = [];
	const { title, text, tags, tagLabels } = this.props
  const className = `panel-text`
  tags.forEach((value, index) => {
    tagArr.push(
    <Tags
      key={index}
      value={value}
      label={tagLabels[index]}
    />
    )
  })
		return(
			<div className = {className}>
				<h2>{title}</h2>
				<p>{text}</p>
				<div className = "tag">
          {tagArr}
				</div>
			</div>
		)
	}
}

export default PanelText