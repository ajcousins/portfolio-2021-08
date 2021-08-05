const projects = require("../client/projects");

const path = require("path");

exports.home = (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "./../client/index.html"));
};

exports.portfolio = (req, res) => {
  res.status(200).render("portfolio", { projects });
};

exports.project = (req, res) => {
  console.log(req.params.id);

  const index = projects.data.findIndex((project) => {
    if (project.id === req.params.id) return true;
  });

  // console.log(projects.data[index]);

  if (index === -1) res.status(404).render("404-project");
  else {
    res.status(200).render(projects.data[index].layout, {
      project: projects.data[index],
      projects,
    });
  }
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
