import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql';
import cors from "cors";

const server = express();
server.use(cors())

server.use(bodyParser.json());


//Establish the database connection


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "zishan@02062001",
  database: "dbsmschool",
});

db.connect(function (err) {
  if (err) {
    console.log("Error Connecting to DB");
  } else {
    console.log("Successfully Connected to DB");
  }
});

//Establish the Port

server.listen(8085, function check(error) {
  if (error) {
    console.log("Error....dddd!!!!");
  }

  else {
    console.log("Started....!!!! 8085");

  }
});

//Create the Records



server.post("/api/student/add",(req,res)=>{
  const q = "INSERT INTO student (`stname`, `course`,`fee`) VALUES (?)"  
  const values = [
    req.body.stname,req.body.course,req.body.fee
  ];

  db.query(q,[values],(err,data)=>{
    if (err) {
        console.log(err);
        return res.json(err);
    }
    return res.json("student has been created successfully");
  })
})



//view the Records

server.get("/api/student", (req, res) => {
  var sql = "SELECT * FROM student";
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});


//Search the Records

server.get("/api/student/:id", (req, res) => {
  var studentid = req.params.id;
  var sql = "SELECT * FROM student WHERE id=" + studentid;
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      res.send({ status: true, data: result });
    }
  });
});




server.put("/api/student/update/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE student SET `stname`= ?, `course`= ?, `fee`= ? WHERE id = ?";

  const values = [
    req.body.stname,
    req.body.course,
    req.body.fee,
    
  ];

  db.query(q, [...values,bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});




//Delete the Records

server.delete("/api/student/delete/:id", (req, res) => {
  let sql = "DELETE FROM student WHERE id=" + req.params.id + "";
  let query = db.query(sql, (error) => {
    if (error) {
      res.send({ status: false, message: "Student Deleted Failed" });
    } else {
      res.send({ status: true, message: "Student Deleted successfully" });
    }
  });
});