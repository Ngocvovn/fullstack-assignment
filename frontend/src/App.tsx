import React from "react";
import { connect } from "react-redux";
import { getTodoList, createTodo, deleteTodo } from "./actions";
import { bindActionCreators } from "redux";
import { TodoItem } from "./components/todoItem";
import { Todo } from "./types";

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
      <div>
        {this.props.todo.todoList.map((todoItem: Todo, i: number) => (
          <TodoItem
            key={i}
            todo={todoItem}
            delete={this.props.actions.deleteTodo.bind(this)}
          />
        ))}

        <div>
          <h2>Create to do item</h2>

          <label>
            Name:
            <input
              type="text"
              value={this.state.description}
              onChange={this.handleChange}
            />
          </label>
          <button
            disabled={!this.state.description}
            onClick={() => {
              this.props.actions.createTodo(this.state.description);
              this.setState({ description: "" });
            }}
          >
            Submit
          </button>
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
