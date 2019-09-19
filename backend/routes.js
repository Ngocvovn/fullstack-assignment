const router = require('express-promise-router')();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {
    getTodo,
    createTodo,
    deleteTodo,
} = require('./controllers');

router.get(
    '/todo',
    getTodo,
);

router.post(
    '/todo',
    jsonParser,
    createTodo,
);

router.delete(
    '/todo',
    jsonParser,
    deleteTodo,
);

module.exports = router;