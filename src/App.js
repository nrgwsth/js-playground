import React, { Component } from 'react'

import Header from "./Header"
import CodeEditor from "./CodeEditor"

import {readExcercises, getSectionData} from "./utils"

class App extends Component {
  constructor(props){
    super(props);
    this.onPrevClick = this.onPrevClick.bind(this);
    this.onNextClick = this.onNextClick.bind(this);
    this.onLinkClick = this.onLinkClick.bind(this);

    this.state = {
      index: 0,
      inputValue: "",
      editing: false,
    }

  }

  componentWillMount(){
    const exercises = readExcercises()
    this.setState({
      codeSamples: readExcercises(),
      sections: getSectionData(exercises)
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

  onLinkClick(index){
    this.setState({
      index: index
    })
  }

  render() {
    const exercise = this.state.codeSamples[this.state.index]
    console.log(exercise)
    return (
      <div className = "rootdiv">
        <Header onNextClick = {this.onNextClick} onPrevClick = {this.onPrevClick} />
        <div className = "body">
          <div className="bodyLeft">
            <div className="bodyLeftTitle">
              {exercise.config.title}
            </div>
            <div className="bodyLeftBody">
              {exercise.blocks.map(item=>(
                item.type === "md" ? 
                  <div className = "leftEditorBody" dangerouslySetInnerHTML={{__html: marked(item.value)}}></div>
                  :
                  <CodeEditor code = {item.value} />
              ))}
            </div>
          </div>
          <div className="bodyRight">
              <div className="bodyRightInner">
                  {Object.keys(this.state.sections).map(key=>(
                    <div className="sectionBody">
                      <div className="sectionTitle">
                        {key}
                      </div>
                      <div className="subSectionBody">
                        {this.state.sections[key].map(item=>(
                          <div className = "subSectionItem" onClick = {()=>this.onLinkClick(item.index)}>{item.value}</div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
          </div>
        </div>
      </div>
    );
  }
}


export default App;
