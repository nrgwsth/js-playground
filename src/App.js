import React, { Component } from 'react'

import Header from "./Header"
import LeftEditor from "./LeftEditor"
import RightEditor from "./RightEditor"

import {readExcercises} from "./utils"

class App extends Component {
  constructor(props){
    super(props);
    this.onPrevClick = this.onPrevClick.bind(this);
    this.onNextClick = this.onNextClick.bind(this);

    this.state = {
      index: 0,
      inputValue: "",
      editing: false,
    }

  }

  componentWillMount(){
    console.log(readExcercises())
    this.setState({
      codeSamples: readExcercises()
    })
  }

  onPrevClick(){
    this.setState({
      editing: false,
      index: this.state.index - 1 >=0 ? this.state.index - 1 : 0
    })
  }

  onNextClick(){
    this.setState({
      editing: false,
      index: this.state.index >= this.state.codeSamples.length-1? this.state.codeSamples.length-1 : this.state.index + 1
    })
  }

  render() {
    const exercise = this.state.codeSamples[this.state.index]
    return (
      <div className = "rootdiv">
        <Header onNextClick = {this.onNextClick} onPrevClick = {this.onPrevClick} />
        <div className = "editorWraper">
           <LeftEditor content = {exercise.content} config = {exercise.config} />
           <RightEditor code = {exercise.code} />
        </div>
      </div>
    );
  }
}


export default App;
