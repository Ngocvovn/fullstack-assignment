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

const credentials = grpc.credentials.createInsecure();

const loadProtoFile = file => {
  const packageDefinition = loader.loadSync(file, protoLoaderOptions);
  return grpc.loadPackageDefinition(packageDefinition);
};

const todoProto = path.join(__dirname, "todo.proto");
const dbService = loadProtoFile(todoProto).todo.db;

const client = new dbService("middle:50051", credentials);

module.exports = client;
