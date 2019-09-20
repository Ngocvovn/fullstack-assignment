const grpc = require("@grpc/grpc-js");
const loader = require("@grpc/proto-loader");
const path = require("path");
const fs = require("fs");

const protoLoaderOptions = {
  keepCase: true,
  defaults: false,
  arrays: true,
  oneofs: false,
  objects: true
};

const rootCACert = fs.readFileSync("./keys/grpc_root_ca.crt");
const clientKey = fs.readFileSync("./keys/backend.key");
const clientCert = fs.readFileSync("./keys/backend.crt");

const credentials = grpc.credentials.createSsl(
  rootCACert,
  clientKey,
  clientCert
);

const loadProtoFile = file => {
  const packageDefinition = loader.loadSync(file, protoLoaderOptions);
  return grpc.loadPackageDefinition(packageDefinition);
};

const todoProto = path.join(__dirname, "todo.proto");
const dbService = loadProtoFile(todoProto).todo.db;

const client = new dbService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

module.exports = client;
