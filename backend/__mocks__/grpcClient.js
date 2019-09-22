const grpcClient = jest.genMockFromModule("./grpcClient");

// This is a custom function that our tests can use during setup to specify
// what the files on the "mock" filesystem should look like when any of the
// `fs` APIs are used.
let mockTodos = [];
const __setMockTodos = newMockTodos => {
  mockTodos = newMockTodos;
};

// A custom version of `readdirSync` that reads from the special mocked out
// file list set via __setMockFiles
const getTodo = (req, callback) => {
  callback(null, {
    todoList: mockTodos || []
  });
};

const deleteTodo = (req, callback) => {
  mockTodos = (mockTodos || []).filter(({ id }) => id !== req.id);
  callback(null, {});
};

const insertTodo = (req, callback) => {
  callback(null, {
    id: "newId",
    payload: req.payload
  });
};

grpcClient.__setMockTodos = __setMockTodos;
grpcClient.get = getTodo;
grpcClient.delete = deleteTodo;
grpcClient.insert = insertTodo;

module.exports = grpcClient;
