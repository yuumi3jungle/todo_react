import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'

class TodoPage extends Component {
  constructor(props) {
    super(props)
    this.state = {todos:[], inEdit:null}
  }
  componentDidMount() {
    this.reloadTodos()
  }
  reloadTodos() {
    fetch("http://localhost:3000/todos.json")
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      this.setState({todos: json})
    })
  }
  render() {
    const selectTodo = (ix) => {this.setState({inEdit: this.state.todos[ix]})}
    const cancelTodo = () => { this.setState({inEdit: null}) }
    const updateTodo = (due, task) => {
      const headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}
      const body = JSON.stringify({todo: {due: due, task: task}})
      fetch(`http://localhost:3000/todos/${this.state.inEdit.id}.json`,
        {method: "PUT", headers: headers, body: body})
      .then((response) => response.json())
      .then(() => {
        this.setState({inEdit: null})
        this.reloadTodos()
      })
    }
    return (
      <React.Fragment>
        <h1>Todo</h1>
        <TodoList todos={this.state.todos} action={selectTodo} />
        {this.state.inEdit ? <TodoEdit todo={this.state.inEdit} done={updateTodo} cancel={cancelTodo} /> : null}
      </React.Fragment>
    )
  }
}

const TodoList = (props) => (
  <table>
    <thead>
      <tr><th>id</th><th>due</th><th>task</th><th></th></tr>
    </thead>
    <tbody>
      {props.todos.map((todo, ix) => <TodoItem key={ix} ix={ix} todo={todo} action={props.action} />)}
    </tbody>
  </table>
)
TodoList.propTypes = {
  todos: PropTypes.array,
  action: PropTypes.func
}

const TodoItem = (props) => {
  let {id, due, task} = props.todo
  const tdStyle = {padding: "4px 10px"}
  return (
    <tr>
      <td style={tdStyle}>{id}</td>
      <td style={tdStyle}>{due}</td>
      <td style={tdStyle}>{task}</td>
      <td><button onClick={() => props.action(props.ix)}>Edit</button></td>
    </tr>
  )
}
TodoItem.propTypes = {
  todo: PropTypes.object,
  ix: PropTypes.number,
  action: PropTypes.func
}

class TodoEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {due: props.todo.due, task: props.todo.task}
  }
  render() {
    return (
      <div>
        <p>Due: <input type="text" value={this.state.due}
                  onChange={(event) => this.setState({due: event.target.value})} /></p>
        <p>Task: <input type="text" value={this.state.task}
                  onChange={(event) => this.setState({task: event.target.value})} /></p>
        <button onClick={() => this.props.done(this.state.due, this.state.task)}> Update </button>
        <button onClick={() => this.props.cancel()}> Cancel </button>
      </div>
    )
  }
}
TodoEdit.propTypes = {
  todo: PropTypes.object,
  done: PropTypes.func,
  cancel: PropTypes.func
}

ReactDOM.render(
  <TodoPage/>,
  document.getElementById('root')
);
