const path = require("path");
const express = require("express");
const viewRouter = require("./viewRouter");

const app = express();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Static files to be served from public folder
app.use(express.static(path.join(__dirname, "../client")));

app.use("/", viewRouter);

module.exports = app;
