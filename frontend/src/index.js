import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ReactDataGrid from 'react-data-grid'
import 'bootstrap/dist/css/bootstrap.css'
const columns = [
  { key: "id", name: "ID", editable: false },
  { key: "due", name: "Due", editable: true },
  { key: "task", name: "Task", editable: true }
];

class TodoPage extends Component {
  constructor(props) {
    super(props)
    this.state = {rows:[]}
  }
  componentDidMount() {
    this.reloadTodos()
  }
  reloadTodos() {
    fetch("http://localhost:3000/todos.json")
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      this.setState({rows: json})
    })
  }
  updateTodo(todo) {
    const headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}
    const body = JSON.stringify({todo: todo})
    fetch(`http://localhost:3000/todos/${todo.id}.json`,
      {method: "PUT", headers: headers, body: body})
    .then((response) => response.json())
    .then(() => {
      this.reloadTodos()
    })
  }
  onGridRowsUpdated(updateEvent) {
    console.log(updateEvent)
    const todo = Object.assign(this.state.rows[updateEvent.fromRow], updateEvent.updated)
    this.updateTodo(todo)
  }
  render() {
    return (
      <div style={{margin: "20px auto", width: "70%"}}>
      <ReactDataGrid
        columns={columns}
        rowGetter={i => this.state.rows[i]}
        rowsCount={3}
        onGridRowsUpdated={event => this.onGridRowsUpdated(event)}
        enableCellSelect={true}
      />
      </div>
    )
  }
}


ReactDOM.render(
  <TodoPage/>,
  document.getElementById('root')
);
