import React, { Component } from 'react'

class LeftEditor extends Component{
  render(){
    const {config, content} = this.props
    return(
      <div className = "leftEditor">
        <div className = "leftEditorHeader">{config.title}</div>
        <div className = "leftEditorBody" dangerouslySetInnerHTML={{__html: marked(content)}}></div>
      </div>
    )
  }
}

export default LeftEditor