jest.mock("./grpcClient");

const { getTodo, createTodo, deleteTodo } = require("./controllers");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe("controllers", () => {
  const MOCK_TODO_1 = {
    id: "task_1",
    payload: "Task 1 payload"
  };
  const MOCK_TODO_2 = {
    id: "task_2",
    payload: "Task 2 payload"
  };

  describe("controllers.getTodo", () => {
    beforeEach(() => {
      require("./grpcClient").__setMockTodos(null);
    });

    it("should return array of todos", async () => {
      let todos = [MOCK_TODO_1, MOCK_TODO_2];
      require("./grpcClient").__setMockTodos(todos);
      let res = mockResponse();
      await getTodo({}, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(todos);
    });

    it("should return empty array of todos", async () => {
      let res = mockResponse();
      await getTodo({}, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith([]);
    });
  });

  describe("controllers.insertTodo", () => {
    beforeEach(() => {
      require("./grpcClient").__setMockTodos(null);
    });

    it("should return new todo with id", async () => {
      let res = mockResponse();
      await createTodo({ body: { payload: "hi" } }, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ id: "newId", payload: "hi" });
    });
  });

  describe("controllers.deleteTodo", () => {
    beforeEach(() => {
      require("./grpcClient").__setMockTodos(null);
    });

    it("should delete mock todo 1", async () => {
      const todos = [MOCK_TODO_1, MOCK_TODO_2];
      require("./grpcClient").__setMockTodos(todos);
      let res = mockResponse();
      await deleteTodo({ params: { id: MOCK_TODO_1.id } }, res);
      expect(res.status).toHaveBeenCalledWith(200);
      res = mockResponse();

      await getTodo({}, res);
      expect(res.send).toHaveBeenCalledWith([MOCK_TODO_2]);
    });
  });
});
