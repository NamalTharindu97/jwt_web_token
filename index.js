const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());

const users = [
  {
    id: "1",
    username: "namal",
    password: "namal97",
    isAdmin: true,
  },
  {
    id: "2",
    username: "tharindu",
    password: "tharindu97",
    isAdmin: false,
  },
];

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => {
    return u.username === username && u.password === password;
  });

  if (user) {
    const accessToken = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      "mySecretKey"
    );
    res.json({
      username: user.username,
      isAdmin: user.isAdmin,
      accessToken,
    });
  } else {
    res.status(400).json("user name or password incorrect");
  }
});

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, "mySecretKey", (err, user) => {
      if (err) {
        res.status(403).json("Token is not valid");
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("you are not authenticated");
  }
};

app.delete("/api/delete/:userId", verify, (req, res) => {
  if (req.user.id === req.params.userId) {
    res.status(200).json("user has been deleted");
  } else {
    res.status(403).json("you are not allowed to delete this user");
  }
});

app.listen(5000, () => console.log("Backend sever running"));
