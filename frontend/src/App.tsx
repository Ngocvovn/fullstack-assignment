import React from "react";
import { connect } from "react-redux";
import { getTodoList, createTodo, deleteTodo } from "./actions";
import { bindActionCreators } from "redux";
import { TodoItem } from "./components/todoItem";
import { Todo } from "./types";

class App extends React.Component<any, any> {
  componentDidMount() {
    this.props.actions.getTodoList();
  }

  render() {
    console.log(this.props);

    return (
      <div>
        {this.props.todo.todoList.map((todoItem: Todo, i: number) => (
          <TodoItem todo={todoItem} delete={this.props.deleteTodo.bind(this)} />
        ))}
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
