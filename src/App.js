import React, { Component } from 'react';

let codeSamples = require("./exercises.json")

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

    window.hljs.configure({useBR: true});
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
      codeString: window.js_beautify(props.data),
      editing: false
    }
  }

  runClick(){
    const assert = `function assert(condition, msg){
      const html = document.getElementById("result").innerHTML
      const classprefix = condition ? "pass" : "fail"
      document.getElementById("result").innerHTML = html + "<div><span class='result-span-"+classprefix+"'>"+classprefix+"</span><span class='result-span-message'>"+msg+"</span></div>"
    }`
    var func = new Function(assert + this.state.codeString)
    try{
      func()
    } catch(e){
      console.log(error)
    }
  }

  onChange(e){
    this.setState({
      codeString: e.target.value
    })
  }

  componentWillReceiveProps(nextProps){
    if(this.props.data !== nextProps.data){
      this.setState({
        codeString: window.js_beautify(nextProps.data),
        editing: false
      })
      document.getElementById("result").innerHTML = ""
    }
  }

  render(){
    return(
      <div className = "rightEditor">
        {!this.state.editing ?
          <div
            className = "rightEditorBody"
            onDoubleClick = {()=>this.setState({editing: true})}
            dangerouslySetInnerHTML = {{__html: window.hljs.highlight("javascript", this.state.codeString).value}}
          ></div>
          :
          <textarea
            className = "rightEditorBody"
            value = {this.state.codeString}
            onChange = {this.onChange.bind(this)}
          />
        }
        <div className = "floatingRunButton">
          <button onClick = {this.runClick.bind(this)}>Run</button>
        </div>
        <div id = "result"></div>
      </div>
    )
  }
}

export default App;
