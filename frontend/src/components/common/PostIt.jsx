import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PostItInfo } from "apis/PostItApi";

import "./postIt.css";
import { useRecoilValue } from "recoil";
import { UserIdState } from "atoms/UserInfoAtom";

const BtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 86.111vw;
  @media screen and (min-width: 1280px) {
    width: 826.666px;
  }
`;

const Btn = styled.button`
  width: 5.556vw;
  height: 2.222vw;
  border: none;
  border-radius: 1.042vw 1.042vw 0 0;
  font-size: 1.111vw;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s linear;
  :hover {
    box-shadow: 0.278vw 0.139vw 0.903vw 0.139vw grey;
    transform: scale(1.2);
  }
  :active {
    box-shadow: 0.208vw 0.208vw 0.486vw 0.069vw grey inset;
  }
  :nth-child(1) {
    background-color: ${(props) => props.theme.mainColor};
    margin-right: 1.667vw;
  }
  :nth-child(2) {
    background-color: #7d9ada;
  }
  @media screen and (min-width: 1280px) {
    width: 53.338px;
    height: 21.331px;
    border: none;
    border-radius: 10.003px 10.003px 0 0;
    font-size: 10.666px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s linear;
    :hover {
      box-shadow: 2.669px 1.334px 8.669px 1.334px grey;
      transform: scale(1.2);
    }
    :active {
      box-shadow: 1.997px 1.997px 4.666px 0.662px grey inset;
    }
    :nth-child(1) {
      background-color: ${(props) => props.theme.mainColor};
      margin-right: 16.003px;
    }
    :nth-child(2) {
      background-color: #7d9ada;
    }
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
      x: props.x,
      y: props.y,
    };
    console.log("view all props for Note class: " + this.props.children);
  }

  //Event methods
  componentWillMount() {
    this.style = {
      // left: "0px",
      // top: "0px",
      // left: this.randomBetween(5, 85) + "%",
      // top: this.randomBetween(0, 55) + "%",
      left: String(this.state.x) + "%",
      top: String(this.state.y) + "%",
      transform: "rotate( " + this.randomBetween(-15, 15) + "deg)",
    };
  }

  componentDidMount() {
    var mine = this._input;
    // this.style = {
    //   left: String(this.state.x) + "%",
    //   top: String(this.state.y) + "%",
    // };
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
// console.log("OUTSIDE", this.state.notesStringArray);
//parent component for notes
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.eachNote = this.eachNote.bind(this);
    this.remove = this.remove.bind(this);
    this.removeAll = this.removeAll.bind(this);
    this.add = this.add.bind(this);
    this.state = {
      notesStringArray: [],
      userId: this.props.userId,
    };
  }

  //Event methods

  nextId() {
    // this.uniqueId = this.uniqueId || 0;
    // return this.uniqueId++;
    return this.state.notesStringArray.length + 1;
  }
  async update(newText, i) {
    console.log("!", this._input);
    var arr = this.state.notesStringArray;
    arr[i].content = newText;
    arr[i].updateTime = this.nowdate();
    this.setState({ notesStringArray: arr });
    PostItInfo.api.patch(
      `/users/${this.props.userId}/memos/${arr[i].id}`,
      arr[i],
    );
  }

  eachNote(element, i) {
    return (
      <Note
        key={element.id}
        index={i}
        x={element.pos.x}
        y={element.pos.y}
        onChange={this.update}
        onRemove={this.remove}
      >
        {element.content}
      </Note>
    );
  }

  async remove(index) {
    var arr = this.state.notesStringArray;
    var elm = arr[index];
    arr.splice(index, 1);
    this.setState({ notesStringArray: arr });
    await PostItInfo.api.delete(`/users/${this.props.userId}/memos/${elm.id}`);
    return elm;
  }

  async getPostIt() {
    const postArr = await PostItInfo.api.get(
      `/users/${this.props.userId}/memos`,
    );
    var arr = this.state.notesStringArray;
    arr.push(...postArr.data.result.memos);
    this.setState({ notesStringArray: arr });
  }

  componentWillMount() {
    this.getPostIt();
    console.log("HERE", this.state.notesStringArray);
    var self = this;
    if (this.props.count) {
      $.getJSON(
        "https://baconipsom.com/api/?type=all-meat&sentences=" +
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

  randomBetween(min, max) {
    return min + Math.ceil(Math.random() * max);
  }

  nowdate() {
    const TIME_ZONE = 3240 * 10000;
    const date = new Date();
    const now = new Date(+date + TIME_ZONE).toISOString().slice(0, -5);
    return now;
  }

  add(text) {
    var arr = this.state.notesStringArray;
    const postIt = {
      id: this.nextId(),
      content: text,
      creatTime: this.nowdate(),
      updateTime: this.nowdate(),
      pos: {
        x: this.randomBetween(5, 85),
        y: this.randomBetween(0, 55),
      },
    };
    arr.push(postIt);
    JSON.stringify(arr);
    this.setState({ notesStringArray: arr });
    PostItInfo.api.post(`/users/${this.props.userId}/memos`, postIt);
    console.log("ADD!", this.state.notesStringArray);
  }

  removeAll() {
    var arr = this.state.notesStringArray;
    arr.forEach(async (memo) => {
      await PostItInfo.api.delete(
        `/users/${this.props.userId}/memos/${memo.id}`,
      );
    });

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

// Board.propTypes = {
//   count: function (props, propName) {
//     if (typeof props[propName] !== "number") {
//       return new Error("THe count property must be a number");
//     }

//     if (props[propName] > 100) {
//       return new Error("Creating " + props[propName] + "notes is ridiculous ");
//     }
//   },
// };

export default function PostIt() {
  const userId = useRecoilValue(UserIdState);

  return <Board count={50} userId={userId}></Board>;
}
