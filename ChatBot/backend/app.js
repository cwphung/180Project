const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());

const routes = require("./routes");
app.use(routes);

app.use(express.static(path.join(__dirname, "..", "FrontEnd", "build")));

app.listen(PORT, function () {
  console.log(`Server running at http://127.0.0.1:${PORT}/`);
});
