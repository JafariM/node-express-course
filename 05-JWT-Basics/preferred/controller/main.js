const CustomAPIError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");

//public route
const logon = async (req, res) => {
  const { username, password } = req.body;
  //temporary id for user, since there is no DB connection
  const id = new Date().getDate();

  if (!username || !password) {
    throw new CustomAPIError("Please provide username and password", 400);
  }

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).json({ msg: "You are logged in", token });
};

//only authorized users can access
const welcome = async (req, res) => {
  res.status(200).json({ msg: `hello, welcome ${req.user.username}` });
};

module.exports = { logon, welcome };
