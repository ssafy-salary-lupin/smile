import React from "react";
import styled from "styled-components";

import "./postIt.css";

const BtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Btn = styled.button`
  width: 80px;
  height: 32px;
  border: none;
  border-radius: 15px 15px 0 0;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  :hover {
    box-shadow: 4px 2px 13px 2px grey;
  }
  :active {
    box-shadow: 3px 3px 7px 1px grey inset;
  }
  :nth-child(1) {
    background-color: ${(props) => props.theme.mainColor};
    margin-right: 8px;
  }
  :nth-child(2) {
    background-color: #7d9ada;
  }
`;

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.edit = this.edit.bind(this);
    this.remove = this.remove.bind(this);
    this.save = this.save.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderDisplay = this.renderDisplay.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.state = {
      checked: false,
      editing: false,
    };
    console.log("view all props for Note class: " + this.props.children);
  }

  //Event methods
  componentWillMount() {
    this.style = {
      // left: "0px",
      // top: "0px",
      left: this.randomBetween(0, 1100) + "px",
      top: this.randomBetween(0, 200) + "px",
      transform: "rotate( " + this.randomBetween(-15, 15) + "deg)",
    };
  }

  componentDidMount() {
    var mine = this._input;
    $(mine).draggable();
  }
  randomBetween(min, max) {
    return min + Math.ceil(Math.random() * max);
  }
  edit() {
    this.setState({ editing: true });
  }
  save() {
    this.props.onChange(this.refs.newText.value, this.props.index);
    this.setState({ editing: false });
  }
  remove() {
    this.props.onRemove(this.props.index);
  }
  handleClick() {
    this.setState({ checked: !this.state.checked });
  }

  renderDisplay() {
    return (
      <div ref={(c) => (this._input = c)} className="note" style={this.style}>
        <p>{this.props.children}</p>
        <span>
          <button
            onClick={this.edit}
            className="btn btn-primary glyphicon glyphicon-pencil"
          >
            edit
          </button>

          <button
            onClick={this.remove}
            className="btn btn-danger glyphicon glyphicon-trash"
          >
            delete
          </button>
        </span>
      </div>
    );
  }
  renderForm() {
    return (
      <div ref="myNote" className="note" style={this.style}>
        <textarea
          ref="newText"
          defaultValue={this.props.children}
          className="form-control"
        ></textarea>
        <button
          className="btn btn-success btn-sm glyphicon glyphicon-floppy-disk"
          onClick={this.save}
        >
          save
        </button>
      </div>
    );
  }
  //------------------------------------------

  render() {
    if (this.state.editing) {
      return this.renderForm();
    } else {
      return this.renderDisplay();
    }
  }
}

//parent component for notes
class Board extends React.Component {
  constructor() {
    super();

    this.update = this.update.bind(this);
    this.eachNote = this.eachNote.bind(this);
    this.remove = this.remove.bind(this);
    this.removeAll = this.removeAll.bind(this);
    this.add = this.add.bind(this);
    this.state = {
      notesStringArray: [],
    };
  }

  //Event methods

  nextId() {
    this.uniqueId = this.uniqueId || 0;
    return this.uniqueId++;
  }
  update(newText, i) {
    var arr = this.state.notesStringArray;
    arr[i].note = newText;
    this.setState({ notesStringArray: arr });
  }

  eachNote(element, i) {
    return (
      <Note
        key={element.id}
        index={i}
        onChange={this.update}
        onRemove={this.remove}
      >
        {element.note}
      </Note>
    );
  }

  remove(index) {
    var arr = this.state.notesStringArray;
    var elm = arr[index];
    arr.splice(index, 1);
    this.setState({ notesStringArray: arr });
    return elm;
  }
  componentWillMount() {
    var self = this;
    if (this.props.count) {
      $.getJSON(
        "http://baconipsom.com/api/?type=all-meat&sentences=" +
          this.props.count +
          "&start-with-lorem=1&callback=?",
        function (results) {
          var data = results[0].split(". ").forEach(function (sentence) {
            self.add(sentence.substring(0, 40));
          });
        },
      );
    }
  }
  add(text) {
    var arr = this.state.notesStringArray;
    arr.push({
      id: this.nextId(),
      note: text,
    });
    JSON.stringify(arr);
    this.setState({ notesStringArray: arr });
  }

  removeAll() {
    var arr = this.state.notesStringArray;
    arr.length = 0;
    this.setState({ notesStringArray: arr });
  }

  render() {
    return (
      <>
        <BtnContainer>
          <Btn onClick={this.add.bind(null, "New Note!")}>생성</Btn>
          <Btn onClick={this.removeAll}>삭제</Btn>
        </BtnContainer>
        <div className="board">
          {" "}
          {this.state.notesStringArray.map(this.eachNote)}
          {/* <button
          className="btn btn-sm glyphicon glyphicon-plus btn-success"
          onClick={this.add.bind(null, "New Note!")}
        >
          +
        </button> */}
        </div>
      </>
    );
  }
}

Board.propTypes = {
  count: function (props, propName) {
    if (typeof props[propName] !== "number") {
      return new Error("THe count property must be a number");
    }

    if (props[propName] > 100) {
      return new Error("Creating " + props[propName] + "notes is ridiculous ");
    }
  },
};

export default function PostIt() {
  return <Board count={50}></Board>;
}
