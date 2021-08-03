const projects = require("../client/projects");

const path = require("path");

exports.home = (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "./../client/index.html"));
};

exports.portfolio = (req, res) => {
  res.status(200).render("portfolio", { projects });
};

exports.about = (req, res) => {
  res.status(200).render("about");
};

exports.contact = (req, res) => {
  res.status(200).render("contact");
};

exports.error = (req, res) => {
  res.status(404).render("404");
};
