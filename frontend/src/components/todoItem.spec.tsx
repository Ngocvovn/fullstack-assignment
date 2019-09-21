import React from "react";
import Enzyme from "../enzyme";
import { TodoItem } from "./todoItem";
import { Todo } from "../types";

describe("SharedButton Component", () => {
  let wrapper: any;
  let mockFunc: any;
  let todo: Todo;
  beforeEach(() => {
    mockFunc = jest.fn();
    todo = { id: "123", payload: "Do 1" };
    wrapper = Enzyme.shallow(<TodoItem todo={todo} delete={mockFunc} />);
  });

  it("renders todo item", () => {
    expect(wrapper.find("p")).toBeDefined();
    expect(wrapper.find("p")).toHaveLength(2);
  });

  it("renders correct text in item", () => {
    //Expect the child of the first item to be an array
    expect(wrapper.find("p").get(0).props.children).toEqual(todo.id);
    expect(wrapper.find("p").get(1).props.children).toEqual(todo.payload);
  });

  it("Should emit callback on click event", () => {
    const button = wrapper.find("button");
    button.simulate("click");
    const callback = mockFunc.mock.calls.length;
    expect(callback).toBe(1);
  });
});
