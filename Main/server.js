const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'password',
    database: 'department_db'
}, console.log('connected to db'));

app.get("/api/department", (req, res) => {
    // db.query('SELECT ')
    res.send('hello from api/department')
});

app.listen(PORT, () => {
    console.log('Web running on port 3001')
});