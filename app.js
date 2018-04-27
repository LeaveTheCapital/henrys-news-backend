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
  if (err.status === 404)
    res
      .status(404)
      .send({ status: 404, message: err.message || "route not found" });
  else if (err.status === 400)
    res
      .status(400)
      .send({ status: 400, message: err.message || "bad request" });
  else if (err.status === 204)
    res.status(204).send({ status: 404, message: err.message || "no content" });
  else res.status(500).send({ status: 500, message: "internal server error" });
});

function logRequest(req, res, next) {
  console.log(req.url);
  next();
}

module.exports = app;
