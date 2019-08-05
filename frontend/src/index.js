import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'

class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = {todos: []}
  }
  componentDidMount() {
    fetch("http://localhost:3000/todos.json")
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      this.setState({todos: json})
    })
  }
  render() {
    return (
      <React.Fragment>
        <h1>Todo</h1>
        <table>
          <thead>
            <tr><th>id</th><th>due</th><th>task</th></tr>
          </thead>
          <tbody>
            {this.state.todos.map((todo, ix) => <TodoItem key={ix} todo={todo} />)}
          </tbody>
        </table>
      </React.Fragment>
    )
  }
}

const TodoItem = (props) => {
  let {id, due, task} = props.todo
  const tdStyle = {padding: "4px 10px"}
  return (<tr><td style={tdStyle}>{id}</td><td style={tdStyle}>{due}</td><td style={tdStyle}>{task}</td></tr>)
}
TodoItem.propTypes = {
  todo: PropTypes.object
}

ReactDOM.render(
  <TodoList/>,
  document.getElementById('root')
);
