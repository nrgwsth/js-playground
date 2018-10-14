import React, { Component } from 'react'
import beautify from "js-beautify/js"

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
    if(this.props.code !== nextProps.code){
      const editor = this.state.editor
      editor.session.setValue(beautify(this.props.code, {eol: '\n'}))
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
    editor.session.setValue(beautify(this.props.code, {eol: '\n'}))
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

export default RightEditor