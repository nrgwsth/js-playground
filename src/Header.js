import React, { Component } from 'react'

class Header extends Component{
  render(){
    return(
      <div className = "headerWrapper">
        <div className = "leftHeader">
           JS-PLAYGROUND
        </div>
        <div className = "rightHeader">
          <button onClick = {this.props.onPrevClick}>Prev</button>
          <button onClick = {this.props.onNextClick}>Next</button>
        </div>
      </div>
    )
  }
}

export default Header