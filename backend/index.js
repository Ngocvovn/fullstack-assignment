const express = require("express");
const app = express();
const port = 3000;
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3006");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  next();
});

app.use("/v1", require("./routes"));

app.listen(port, () => {
  console.log("backend running at port " + port);
});

module.exports = app;
