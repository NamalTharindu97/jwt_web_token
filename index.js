const express = require("express");
const app = express();

app.use(express.json());

const users = [
  {
    id: "1",
    username: "namal",
    password: "namal97",
    isAdimin: true,
  },
  {
    id: "1",
    username: "tharindu",
    password: "tharindu97",
    isAdimin: false,
  },
];

app.post("/api/login", (req, res) => {
  res.json("hei its work");
});

app.listen(5000, () => console.log("Backend sever running"));
