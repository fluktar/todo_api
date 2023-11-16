const path = require("path");

const express = require("express");
const indexRoutes = require("./routes/indexRoutes");
const routes = require("./routes/link");
const db = require("./data/database");

const app = express();

// Activate EJS view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true })); // Parse incoming request bodies
app.use("/dist", express.static("dist")); // Serve static files (e.g. CSS files)
app.use(express.json()); // Parse incoming request bodies

app.use(indexRoutes);
app.use("/todos", routes);

db.initDb()
  .then(function () {
    app.listen(3005);
  })
  .catch(function (err) {
    console.log("Connection to the database failed! ");
  });
