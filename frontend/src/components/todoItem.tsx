import React from "react";
import { Todo } from "../types";

export type TodoProps = {
  todo: Todo;
  delete: (id: string) => void;
};

export const TodoItem: React.FC<TodoProps> = (props) => {
  return (
    <tr>
      <td>{props.todo.id}</td>
      <td>{props.todo.payload}</td>
      <td>
        <button
          className="btn btn-primary"
          onClick={() => props.delete(props.todo.id)}
        >
          Done
        </button>
      </td>
    </tr>
  );
};
