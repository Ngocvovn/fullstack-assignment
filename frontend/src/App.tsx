import React from "react";
import { connect } from "react-redux";
import { getTodoList, createTodo, deleteTodo } from "./actions";
import { bindActionCreators } from "redux";
import { TodoItem } from "./components/todoItem";
import { Todo } from "./types";
import Form from "react-bootstrap/Form";

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { description: "" };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.props.actions.getTodoList();
  }

  handleChange(event: any) {
    this.setState({ description: event.target.value });
  }

  render() {
    return (
      <div className="container">
        <h2 className="py-5">To do list</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Description</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.props.todo.todoList.map((todoItem: Todo, i: number) => (
              <TodoItem
                key={i}
                todo={todoItem}
                delete={this.props.actions.deleteTodo.bind(this)}
              />
            ))}
          </tbody>
        </table>
        <div className="py-5">
          <h2 className="pb-3">Create to do item</h2>

          <Form>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={this.state.description}
                onChange={this.handleChange}
              />
            </Form.Group>

            <button
              disabled={!this.state.description}
              className="btn btn-primary"
              type="submit"
              onClick={() => {
                this.props.actions.createTodo(this.state.description);
                this.setState({ description: "" });
              }}
            >
              Submit
            </button>
          </Form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  const { todo } = state;

  return {
    todo
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    actions: bindActionCreators(
      { getTodoList, createTodo, deleteTodo },
      dispatch
    )
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
