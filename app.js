const express = require("express");
const mysql = require("mysql");

// Create connection with mysql
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodemysql",
});

// Connect to database
db.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + db.threadId);
});

const app = express();

// Create database
app.get("/createdb", (req, res) => {
  const sql = "CREATE DATABASE nodemysql";

  db.query(sql, (err, result) => {
    if (err) throw err;

    console.log(result);
    res.send("Database created!");
  });
});

// Create table
app.get("/createposttable", (req, res) => {
  const sql =
    "CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))";

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Posts table is created!");
  });
});

// Insert post
app.get("/add-post1", (req, res) => {
  const post = { title: "Post One", body: "This is post one" };
  const sql = "INSERT INTO posts SET ?";

  db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post one is added!");
  });
});

// Select all posts
app.get("/get-posts", (req, res) => {
  const sql = "SELECT * FROM posts";

  db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send("Posts fetched...!");
  });
});

// Select single post
app.get("/get-posts/:id", (req, res) => {
  const sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post fetched...!");
  });
});

// Updated post
app.get("/update-post/:id", (req, res) => {
  const newTitle = "Updated title";
  const sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post is updated!!!");
  });
});

// Delete post
app.get("/delete-post/:id", (req, res) => {
  const sql = `DELETE FROM posts WHERE id = ${req.params.id}`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post " + req.params.id + " deleted...");
  });
});

// Node/Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
