const express = require("express");
const indexRoutes = express.Router();

indexRoutes.get("/", function (req, res, next) {
  res.render("index");
});

module.exports = indexRoutes;
