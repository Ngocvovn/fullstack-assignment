import React from "react";
import { Todo } from "../types";

export type TodoProps = {
  todo: Todo;
  delete: (id: string) => void;
};

export const TodoItem: React.FC<any> = (props: TodoProps) => {
  return (
    <div>
      <p>{props.todo.id}</p>
      <p>{props.todo.payload}</p>
      <button onClick={() => props.delete(props.todo.id)}>Done</button>
    </div>
  );
};
