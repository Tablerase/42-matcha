const express = require("express");
const db = require("./users.js");
const bodyParser = require("body-parser");
const app = express();
const serverPort = require("./settings.js").serverPort;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});
app.get("/users", db.getUsers);
app.get("/users/:id", db.getUserById);
app.post("/users", db.createUser);
app.put("/users/:id", db.updateUser);
app.delete("/users/:id", db.deleteUser);

app.listen(serverPort, () => {
  console.log(`Example app listening on port ${serverPort}`);
});