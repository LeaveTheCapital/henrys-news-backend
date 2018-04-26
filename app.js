const app = require("express")();
const mongoose = require("mongoose");
const apiRouter = require("./routes/api");
const DB_URL = require("./config");
const bodyParser = require("body-parser");

mongoose.connect(DB_URL).then(() => {
  console.log(`connected to ${DB_URL}`);
});

app.use(bodyParser.json());
app.use(logRequest);
app.use("/api", apiRouter);

app.use("/*", (req, res, next) => {
  next({ status: 404, message: "Route not found" });
});

app.use((err, req, res, next) => {
  if (err.status === 404) res.status(404).send({ message: err.message });
  else if (err.status === 400) res.status(400).send({ message: err.message });
  else res.status(500).send({ message: err.message });
});

function logRequest(req, res, next) {
  console.log(req.url);
  next();
}

module.exports = app;
