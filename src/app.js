const express = require("express");
const app = express();
const path = require("path");
var cors = require("cors");

app.use(cors());

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../views");

app.set("view engine", "hbs");
app.set("views", viewPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index");
});

app.get("*", (req, res) => {
  res.render("404");
});

app.listen(port, () => {
  console.log(`Server is up and running at port ${port} `);
});
