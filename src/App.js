import React, { Component } from 'react';
import beautify from "js-beautify/js"

import codeSamples from "./exercises"

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
    this.setState({
      codeSamples: codeSamples
    });

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
    return (
      <div className = "rootdiv">
        <Header onNextClick = {this.onNextClick} onPrevClick = {this.onPrevClick} />
        <div className = "editorWraper">
           <LeftEditor data = {codeSamples[this.state.index].content} />
           <RightEditor data = {codeSamples[this.state.index].codeString} />
        </div>
      </div>
    );
  }
}


class Header extends Component{
  render(){
    return(
      <div className = "headerWrapper">
        <div className = "leftHeader">
           JS-PLAYGROUND
        </div>
        <div className = "rightHeader">
          <button onClick = {this.props.onNextClick}>Next</button>
          <button onClick = {this.props.onPrevClick}>Prev</button>
        </div>
      </div>
    )
  }
}

class LeftEditor extends Component{
  render(){
    const {data} = this.props
    return(
      <div className = "leftEditor">
        <div className = "leftEditorHeader">{data.heading}</div>
        <div className = "leftEditorBody" dangerouslySetInnerHTML={{__html: marked(data.contentMD)}}></div>
      </div>
    )
  }
}

class RightEditor extends Component{
  constructor(props){
    super(props)
    this.state = {
      editing: false
    }
    this.editorRef = React.createRef()
  }

  runClick(){
    const assert = `function assert(condition, msg){
      const html = document.getElementById("result").innerHTML
      const classprefix = condition ? "pass" : "fail"
      document.getElementById("result").innerHTML = html + "<div><span class='result-span-"+classprefix+"'>"+classprefix+"</span><span class='result-span-message'>"+msg+"</span></div>"
    }`

    const editor = this.state.editor
    var func = new Function(assert + editor.session.getValue())
    try{
      func()
    } catch(e){
      console.log(error)
    }
  }

  resetClick(){
    const editor = this.state.editor
    editor.session.setValue(beautify(this.props.data, {eol: '\n'}))
  }

  componentWillReceiveProps(nextProps){
    if(this.props.data !== nextProps.data){
      const editor = this.state.editor
      editor.session.setValue(beautify(this.props.data, {eol: '\n'}))
      document.getElementById("result").innerHTML = ""
    }
  }

  componentDidMount(){
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/javascript")
    this.setState({
      editor: editor
    })
    editor.session.setValue(beautify(this.props.data, {eol: '\n'}))
  }

  render(){
    return(
      <div className = "rightEditor">
        <div
          id="editor"
          className = "rightEditorBody"
          ref = {this.editorRef}
        ></div>
        <div className = "floatingRunButton">
          <button onClick = {this.runClick.bind(this)}>Run</button>
          <button onClick = {this.resetClick.bind(this)}>Reset</button>
        </div>
        <div id = "result"></div>
      </div>
    )
  }
}

export default App;
