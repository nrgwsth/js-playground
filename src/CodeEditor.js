import React, { Component } from 'react'
import beautify from "js-beautify/js"

function getUniqueNumberFromString(s){
  return s.split().reduce((acc, val, i)=>acc+s.charCodeAt(i), 0)
}

class RightEditor extends Component{
  constructor(props){
    super(props)
    this.state = {
      editing: false,
      results: []
    }
    this.editorRef = React.createRef()
    this.onClear = this.onClear.bind(this)
  }

  assert(cond, msg){
    this.setState({
      results: this.state.results.concat({
        cond: cond,
        value: msg
      })
    })
  }

  runClick(){
    this.setState({
      results: []
    }, ()=>{
      window.assert = this.assert.bind(this)
      const editor = this.state.editor
      var func = new Function(editor.session.getValue())
      try{
        func()
      } catch(e){
        console.log(error)
      }
    })
  }

  resetClick(){
    const editor = this.state.editor
    editor.session.setValue(beautify(this.props.code, {eol: '\n'}))
  }

  componentWillReceiveProps(nextProps){
    if(this.props.code !== nextProps.code){
      const editor = this.state.editor
      editor.session.setValue(beautify(this.props.code, {eol: '\n'}))
      document.getElementById("result").innerHTML = ""
    }
  }

  componentDidMount(){
    var editor = ace.edit(`editor${getUniqueNumberFromString(this.props.code)}`);
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/javascript")
    this.setState({
      editor: editor
    })
    editor.session.setValue(beautify(this.props.code, {eol: '\n'}))
  }

  onClear(){
    this.setState({
      results: []
    })
  }

  render(){
    return(
        <div className = "rightEditor">
          <div style={{"position": "relative"}}>
            <div
              id={`editor${getUniqueNumberFromString(this.props.code)}`}
              className = "rightEditorBody"
              ref = {this.editorRef}
            ></div>
            <div className = "floatingRunButton">
              <button className="secondary" onClick = {this.runClick.bind(this)}>Run</button>
              <button className="secondary" onClick = {this.resetClick.bind(this)}>Reset</button>
            </div>
          </div>
          <div id = "result">
            {this.state.results.length > 0 &&
              <div className="clear"><button onClick = {this.onClear}>Clear</button></div>
            }
            {this.state.results.map(item=>(
              <div className="resultIndiv">
                {item.cond && <span className="result-span-pass">PASS</span>}
                {!item.cond && <span className="result-span-fail">FAIL</span>}
                <span className="result-span-message">{item.value}</span>
                </div>
            ))}
          </div>
        </div>
    )
  }
}

export default RightEditor