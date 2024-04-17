const express = require("express");
const router = express.Router();
const { logon, welcome } = require("../controller/main");
const authenticationMiddleware = require("../middleware/auth");

router.route("/hello").get(authenticationMiddleware, welcome);
router.route("/logon").post(logon);

module.exports = router;
