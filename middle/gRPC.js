const fs = require("fs");
const path = require("path");
const loader = require("@grpc/proto-loader");
const grpc = require("@grpc/grpc-js");
const createEmitter = require("./createEmitter");
const { ulid } = require("ulid");

const Emitter = createEmitter();

const loadProtoFile = file => {
  const packageDefinition = loader.loadSync(file, {
    keepCase: true,
    defaults: false,
    arrays: true,
    oneofs: false,
    objects: true
  });
  return grpc.loadPackageDefinition(packageDefinition);
};

const todoProto = loadProtoFile(path.join(__dirname, "todo.proto"));

const server = new grpc.Server();

let todoList = [
  {
    id: ulid(),
    payload:
      "implement createEmitter according to the spec defined in ./middle/createEmitter.test.js typescript or javascript, Please add more tests if you think the tests are not enough. (~3-6 hours)"
  },
  {
    id: ulid(),
    payload:
      'implement front-end ui, which interacts with the GET/POST/DELETE endpoints of "backend" service, the requirements of this ui are 0) it shows all current todo in a list view 1) you can add new todo 2) you can mark todo as done (delete todo). You can use React / Angular 2+, typescript or javascript (~6-8 hours)'
  },
  {
    id: ulid(),
    payload:
      'writing tests to test GET/POST/DELETE endpoint in "backend" service, they can be unit tests of functions in ./backend/constrollers or integrity (or e2e) tests against the end-points, please try to write the tests that are "useful" = can help developer to find out the issues, and can prevent mistakes (~2 hours)'
  },
  {
    id: ulid(),
    payload:
      "1) implement a docker-compose.yml or a skaffold.yml (+ k8s manifests) for orchestrating backend/middle/front-end services for development environment. 2) implement production-ready Dockerfile for middle and backend services. (~1-3 hours)"
  }
];

const write = ({ id, payload }) => {
  return new Promise(resolve => {
    todoList.push({ id, payload });
    resolve({ id, payload });
  });
};

server.addService(todoProto.todo.db.service, {
  insert: (call, callback) => {
    const id = ulid();
    Emitter.on(`todo-${id}-written`, payload => {
      callback(null, { id, payload });
    });
    const { payload } = call.request;
    write({ id, payload })
      .then(({ id, payload }) => {
        Emitter.trigger(`todo-${id}-written`, payload);
        Emitter.off(`todo-${id}-written`);
      })
      .catch(e => {
        Emitter.off(`todo-${id}-written`);
      });
  },
  get: (call, callback) => {
    callback(null, { todoList });
  },
  delete: (call, callback) => {
    todoList = todoList.filter(({ id }) => id !== call.request.id);
    callback(null, { todoList });
  }
});

const credentials = grpc.ServerCredentials.createSsl(
  fs.readFileSync("./keys/grpc_root_ca.crt"),
  [
    {
      private_key: fs.readFileSync("./keys/middle.key"),
      cert_chain: fs.readFileSync("./keys/middle.crt")
    }
  ],
  true
);

const start = (port = 50051) => {
  server.bindAsync(
    `0.0.0.0:${port}`,
    grpc.ServerCredentials.createInsecure(),
    (err, bondPort) => {
      err && console.error(`middle service grpc binding error ${err}`);
      server.start();
      !err && console.info(`middle service grpc started, port ${bondPort}`);
    }
  );
};

module.exports = { start };
