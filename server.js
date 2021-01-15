const express = require("express");
const bodyParser = require("body-parser");
const db = require("./database");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'public')))
app.set('view engine', 'ejs')

db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) =>
    console.log("err: Make sure mssql is up and running on localhost ", err)
  );
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});


app.get("/add/branch", async (req, res) => {
  res.sendFile(path.join(__dirname, "branch.html"));
});

app.get("/add/employee", async (req, res) => {
  res.sendFile(path.join(__dirname, "employee.html"));
});
app.get("/add/client", async (req, res) => {
  res.sendFile(path.join(__dirname, "client.html"));
});

app.use("/api", require("./routes/index"));

app.listen(PORT, () => console.log("Server running on port ", PORT));
