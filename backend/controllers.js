const grpcClient = require('./grpcClient');

const getTodoGRPC = () => {
    return new Promise((resolve, reject) => {
        grpcClient.get({}, (error, res) => {
            if (!error) {
                resolve(res.todoList);
            } else {
                reject(error);
            }
        });
    });
};

const createTodoGRPC = (todo) => {
    return new Promise((resolve, reject) => {
        grpcClient.insert({ payload: todo }, (error, res) => {
            if (!error) {
                resolve(res.payload);
            } else {
                reject(error);
            }
        });
    });
};


const deleteTodoGRPC = (id) => {
    return new Promise((resolve, reject) => {
        grpcClient.delete({ id }, (error, res) => {
            if (!error) {
                resolve(res.payload);
            } else {
                reject(error);
            }
        });
    });
};


const getTodo = async (req, res, next) => {
    try {
        const todo = await getTodoGRPC()
        res.status(200).send(todo);
        return;
    } catch (e) {
        res.status(500).send(e.message);
        return;
    }
};

const createTodo = async (req, res, next) => {
    try {
        const { todo } = req.body;
        const createTodo = await createTodoGRPC(todo)
        res.status(200).send(createTodo);
        return;
    } catch (e) {
        res.status(500).send(e.message);
        return;
    }
};

const deleteTodo = async (req, res, next) => {
    try {
        const { id } = req.body;
        await deleteTodoGRPC(id)
        res.status(200).send();
        return;
    } catch (e) {
        res.status(500).send(e.message);
        return;
    }
};

module.exports = {
    getTodo,
    createTodo,
    deleteTodo,
};
