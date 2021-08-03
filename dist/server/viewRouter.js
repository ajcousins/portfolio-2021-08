const express = require("express");
const router = express.Router();
const viewController = require("./viewController");

router.route("/").get(viewController.home);
router.route("/portfolio").get(viewController.portfolio);
router.route("/about").get(viewController.about);
router.route("/contact").get(viewController.contact);

router.route("/*").get(viewController.error);

module.exports = router;
