/*********************************************************************************
*  WEB700 – Assignment 04
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.
*  No part of this assignment has been copied manually or electronically from any other source
*  (including 3rd party web sites) or distributed to other students.
*
*  Name: Akshay Nedumparambil Unnikrishnan Student ID: 190635235 Date: 08-03-2025
*
*  Vercel link: https://assignment-4-web700-final.vercel.app/
*
*********************************************************************************/

const HTTP_PORT = process.env.PORT || 8080;
const express = require("express");
const path = require("path");
const collegeData = require("./collegeData.js");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views/home.html"));
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "views/about.html"));
});

app.get("/htmlDemo", (req, res) => {
    res.sendFile(path.join(__dirname, "views/htmlDemo.html"));
});

app.get("/students", (req, res) => {
    if (req.query.course) {
        collegeData.getStudentsByCourse(req.query.course)
            .then((students) => res.json(students))
            .catch(() => res.json({ message: "no results" }));
    } else {
        collegeData.getAllStudents()
            .then((students) => res.json(students))
            .catch(() => res.json({ message: "no results" }));
    }
});

app.get("/student/:num", (req, res) => {
    collegeData.getStudentByNum(req.params.num)
        .then((student) => res.json(student))
        .catch(() => res.json({ message: "no results" }));
});

app.get("/tas", (req, res) => {
    collegeData.getTAs()
        .then((tas) => res.json(tas))
        .catch(() => res.json({ message: "no results" }));
});

app.get("/courses", (req, res) => {
    collegeData.getCourses()
        .then((courses) => res.json(courses))
        .catch(() => res.json({ message: "no results" }));
});

app.get("/students/add", (req, res) => {
    res.sendFile(path.join(__dirname, "views/addStudent.html"));
});

app.post("/students/add", (req, res) => {
    collegeData.addStudent(req.body)
        .then(() => res.redirect("/students"))
        .catch(err => res.json({ error: err }));
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "views/404.html"));
});

collegeData.initialize()
    .then(() => {
        app.listen(HTTP_PORT, () => console.log(`Server running on port ${HTTP_PORT}`));
    })
    .catch((err) => {
        console.error(err);
    });
