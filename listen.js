const app = require("./app");

const { PORT = 9021 } = process.env;

app.listen(9021, err => {
  if (err) throw err;
  console.log(`listening on port ${PORT}`);
});
