const express = require("express");
const router = express.Router();
const db = require("../database");
const { QueryTypes } = require("sequelize");
const path = require("path");

// @desc Get all data
// @endpoint /api
router.get("/", async (req, res) => {
  const employee = await db.query("SELECT * FROM employee", {
    type: QueryTypes.SELECT,
  });

  const branch = await db.query("SELECT * FROM branch", {
    type: QueryTypes.SELECT,
  });

  const client = await db.query("SELECT * FROM client", {
    type: QueryTypes.SELECT,
  });

  res.render('index', { employee:employee,branch:branch,client:client })
});

router.post("/insert/employee", async (req, res) => {
  const {firstname,lastname,dob,salary} = req.body;
  let query = `INSERT INTO employee VALUES(${
    Math.random() * 1000
  }, '${firstname}', '${lastname}', '${dob}', ${salary}, NULL, NULL);`;

   db.query(query, { type: QueryTypes.INSERT })
   .then(() => {
    res.redirect("/api");

  })
  .catch((err) => {
    console.log("Unable to create,", err);
    res.redirect("/add/employee");
  });

  
});


router.post("/insert/branch", async (req, res) => {
  const { name, numbers, date } = req.body;

  let query = `INSERT INTO branch VALUES(${
    Math.random() * 1000
  }, '${name}', ${numbers}, '${date}')`;

  db.query(query, { type: QueryTypes.INSERT })
    .then(() => {
      res.redirect("/api");

    })
    .catch((err) => {
      console.log("Unable to create,", err);
      res.redirect("/add/branch");
    });
});

router.post("/insert/client", async (req, res) => {
  const { name, branch } = req.body;

  let query = `INSERT INTO client VALUES(${
    Math.random() * 1000
  }, '${name}', ${branch});`;

  db.query(query, { type: QueryTypes.INSERT })
  .then(() => {
    res.redirect("/api");

  })
  .catch((err) => {
    console.log("Unable to create,", err);
    res.redirect("/add/client");
  });
 
  
});



// JOINS

// @desc Get left join data
// @endpoint /api/get/LeftJoin
router.get("/get/LeftJoin", async (req, res) => {
  const leftJoinQuery =
    "select employee.emp_id, employee.first_name, branch.branch_name From employee LEFT JOIN branch On employee.emp_id = branch.mgr_id;";

  const data = await db.query(leftJoinQuery, { type: QueryTypes.SELECT });
  console.log(data);

  res.send(JSON.stringify(data));
});

// @desc Get right join data
// @endpoint /api/get/RightJoin
router.get("/get/RightJoin", async (req, res) => {
  const RightJoinQuery =
    "select employee.emp_id, employee.first_name, branch.branch_name From employee right JOIN branch On employee.emp_id = branch.mgr_id;";

  const data = await db.query(RightJoinQuery, { type: QueryTypes.SELECT });
  console.log(data);

  res.send(JSON.stringify(data));
});

// @desc Get simple join data
// @endpoint /api/get/Join
router.get("/get/Join", async (req, res) => {
  const joinQuery =
    "select employee.emp_id, employee.first_name, branch.branch_name From employee JOIN branch On employee.emp_id = branch.mgr_id;";

  const data = await db.query(joinQuery, { type: QueryTypes.SELECT });
  console.log(data);

  res.send(JSON.stringify(data));
});





module.exports = router;
