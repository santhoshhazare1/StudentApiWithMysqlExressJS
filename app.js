
const express = require('express');
const mysql = require('mysql2');

var router = express.Router();
//Configuring express server

router.use(express.json());
var app = express();
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'db_1',
    multipleStatements: true
});
mysqlConnection.connect((err) => {
    if (!err)
        console.log('Connection Established Successfully');
    else
        console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));
});

app.get('/student', (req, res) => {
    console.log('student api');
    mysqlConnection.query('select * from student;', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        //return res.console.log(rows);    
        else
            console.log(err);
    })
});

app.get('/coursejoin', (req, res) => {
    console.log('course api');
    mysqlConnection.query('SELECT  student_id, student_name, course_name,course_name FROM student INNER JOIN course ON student.course_id = course.course_id;', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        //return res.console.log(rows);    
        else
            console.log(err);
    })
});

app.get('/studentjoin', (req, res) => {
    console.log('course api');
    mysqlConnection.query('SELECT student.student_name, student.student_address, course.course_name, exam.exam_name FROM student JOIN course ON student.course_id = course.course_id JOIN exam ON course.course_id = exam.course_id;', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        //return res.console.log(rows);    
        else
            console.log(err);
    });

});

app.get('/course', (req, res) => {
    console.log('course api');
    mysqlConnection.query('SELECT  * FROM course', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        //return res.console.log(rows);    
        else
            console.log(err);
    })
});
app.get('/exam', (req, res) => {
    console.log('exam api');
    mysqlConnection.query('select * from exam;', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        //return res.console.log(rows);    
        else
            console.log(err);
    })
});

app.get('/examjoin', (req, res) => {
    console.log('exam api');
    mysqlConnection.query('SELECT  course_name, exam_name,exam_id FROM course INNER JOIN exam ON course.course_id = exam.course_id;', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        //return res.console.log(rows);    
        else
            console.log(err);
    })
});

//Router to GET specific student detail from the MySQL database
app.get('/student/:id', (req, res) => {
    mysqlConnection.query('SELECT * from student WHERE student_id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});
app.listen(3000);
module.exports = router;
