const app = require("./app");

const PORT = process.env.PORT || 9021;

app.listen(PORT, err => {
  if (err) throw err;
  console.log(`listening on port ${PORT}`);
});
