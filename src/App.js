import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';
import {StyleSheet, css} from "aphrodite/no-important";

const styles = StyleSheet.create({
  "editor":{
    width: "calc(100% - 10px)",
    margin: "5px",
    minHeight: "250px",
    resize: "none",
    overflowY: "scroll",
    fontSize: "20px",
    border: "1px solid #555",
    ":focus":{
      outline: "none"
    }
  },

  result:{
    width: "calc(100% - 30px)",
    margin: "5px",
    padding: "10px",
    minHeight: "250px",
    fontSize: "14px",
    fontFamily: "'PT Sans', sans-serif",
    border: "1px solid #444"
  },

  btn:{
    padding: "5px 10px",
    margin: "2px",
    border: "none",
    backgroundColor: "#888",
    cursor: "pointer",
    transition: "background-color 0.5s",
    ":hover":{
      backgroundColor: "#bbb"
    },
    ":focus":{
      outline: "none"
    }
  },


  buttonWrapper:{
    float: "right"
  },

  "smallmargin": {
    margin: "5px",
    fontFamily: "'Merriweather', serif"
  }
})

const COLOR = {
  NORMAL: "#AED6F1",
  EDITOR: "#F4F6F7"
}

class App extends Component {

  constructor(props){
    super(props);
    this.currentCodeSample = this.currentCodeSample.bind(this);
    this.onDoubleClick = this.onDoubleClick.bind(this);
    this.prevClick = this.prevClick.bind(this);
    this.nextClick = this.nextClick.bind(this);
    this.runClick = this.runClick.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      codeSamples: [],
      index: 0,
      inputValue: "",
      editing: false,
      styles:{
        textareaBackgroundColor: COLOR.NORMAL
      }
    }

  }

  componentWillMount(){
    const codeSamples = [{
      codeString: "var a = 5;var b = 5;assert(a!==undefined, 'a is not undefined')",
      heading: "variable declaration",
      subHeading: "simple heading",
      explanation: "simple explanation"
    },{
      codeString: "function func1(){};var func2 = function(){};window.func3 = function(){};assert(func1!==undefined, 'func1 exists');assert(func2!==undefined, 'func2 exists');assert(func3!==undefined, 'func3 exists')",
      heading: "function declaration",
      subHeading: "simple heading",
      explanation: "simple explanation"
    }];

    this.setState({
      codeSamples: codeSamples
    });

    window.hljs.configure({useBR: true});
    window.assert = function(condition, message){

      var result = document.getElementById("result");
      var type = condition ? "PASS" : "FAIL";

      var htmlRaw = "<div style='margin: 10px 0;font-size: 18px; font-weight: bold;'><span style='color: red; font-size: 20px; padding: 0 10px;'>"+type+"</span><span>"+message+"</span></div>";

      result.insertAdjacentHTML("beforeend", htmlRaw);
    }
  }

  currentCodeSample(){
    const {state} = this;
    console.log(state);

    return state.editing ? state.inputValue : js_beautify(state.codeSamples[state.index].codeString);
    
  }

  prevClick(){
    this.setState({
      editing: false,
      index: this.state.index - 1 >=0 ? this.state.index - 1 : 0,
      styles:{
        ...this.state.styles,
        textareaBackgroundColor: COLOR.NORMAL
      }
    })

    document.getElementById("result").innerHTML = "";
    console.log("result", document.getElementById("result"))
  }

  nextClick(){
    this.setState({
      editing: false,
      index: this.state.index >= this.state.codeSamples.length-1? this.state.codeSamples.length-1 : this.state.index + 1,
      styles:{
        ...this.state.styles,
        textareaBackgroundColor: COLOR.NORMAL
      }
    })

    document.getElementById("result").innerHTML = "";

  }

  runClick(){
    document.getElementById("result").innerHTML = "";
    eval(this.currentCodeSample());
  }

  onDoubleClick(){
    this.setState({
      editing: true,
      inputValue: js_beautify(this.state.codeSamples[this.state.index].codeString),
      styles:{
        ...this.state.styles,
        textareaBackgroundColor: COLOR.EDITOR
      }
    })
  }


  onChange(e){
    this.setState({
      inputValue: e.target.value
    })
  }

  render() {
    return (
      <div className="wrapper">
        <div>
          <h2 className={css(styles.smallmargin)}>{this.state.codeSamples[this.state.index].heading}</h2>
          <small className={css(styles.smallmargin)}>{this.state.codeSamples[this.state.index].subHeading}</small>
          <div className={css(styles.buttonWrapper)}>
            <button onClick={this.prevClick} className={css(styles.btn)}>Prev</button>
            <button onClick={this.nextClick} className={css(styles.btn)}>Next</button>
            <button onClick={this.runClick} className={css(styles.btn)}>Run</button>
          </div>
          {this.state.editing &&
            <textarea
            className={css(styles.editor)}
            style={{
              backgroundColor: this.state.styles.textareaBackgroundColor
            }}
            value = {this.currentCodeSample()}
            onDoubleClick = {this.onDoubleClick}
            onChange = {this.onChange}
          >
          </textarea>}

          {!this.state.editing &&
            <pre
              className={css(styles.editor)}
              style={{
                backgroundColor: this.state.styles.textareaBackgroundColor
              }}
              onDoubleClick = {this.onDoubleClick}
              onChange = {this.onChange}
              dangerouslySetInnerHTML = {{__html: hljs.highlight("javascript", this.currentCodeSample()).value}}
            >
          </pre>}
        </div>

        <div className={css(styles.result)}>
          <div>
            {this.state.codeSamples[this.state.index].explanation}
          </div>
          <div id="result">
          </div>
        </div>
      </div>  
    );
  }
}

export default App;
