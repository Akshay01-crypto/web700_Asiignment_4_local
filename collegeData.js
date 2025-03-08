const fs = require("fs")

class Data {
    constructor(students, courses) {
        this.students = students
        this.courses = courses
    }
}
let dataCollection = null

module.exports.initialize = function () {
    return new Promise((resolve, reject) => {
        fs.readFile("./data/courses.json", "utf8", (err, courseData) => {
            if (err) {
                reject("unable to load courses")
                return
            }

            fs.readFile("./data/students.json", "utf8", (err, studentData) => {
                if (err) {
                    reject("unable to load students")
                    return
                }
                dataCollection = new Data(JSON.parse(studentData), JSON.parse(courseData))
                resolve()
            })
        })
    })
}

module.exports.getAllStudents = function () {
    return new Promise((resolve, reject) => {
        if (dataCollection.students.length == 0) {
            reject("no results returned")
            return
        }
        resolve(dataCollection.students)
    })
}

module.exports.getTAs = function () {
    return new Promise((resolve, reject) => {
        let filteredStudents = dataCollection.students.filter(student => student.TA === true)

        if (filteredStudents.length == 0) {
            reject("no results returned")
            return
        }

        resolve(filteredStudents)
    })
}

module.exports.getCourses = function () {
    return new Promise((resolve, reject) => {
        if (dataCollection.courses.length == 0) {
            reject("no results returned")
            return
        }
        resolve(dataCollection.courses)
    })
}

module.exports.getStudentByNum = function (num) {
    return new Promise((resolve, reject) => {
        let foundStudent = dataCollection.students.find(student => student.studentNum == num)

        if (!foundStudent) {
            reject("no results returned")
            return
        }

        resolve(foundStudent)
    })
}

module.exports.getStudentsByCourse = function (course) {
    return new Promise((resolve, reject) => {
        let filteredStudents = dataCollection.students.filter(student => student.course == course)

        if (filteredStudents.length == 0) {
            reject("no results returned")
            return
        }

        resolve(filteredStudents)
    })
}
module.exports.addStudent = function (studentData) {
    return new Promise((resolve, reject) => {
        studentData.TA = studentData.TA ? true : false;
        studentData.studentNum = dataCollection.students.length + 1;
        dataCollection.students.push(studentData);
        resolve();
    });
}
