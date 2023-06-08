const express = require('express');
const ejs = require('ejs');
const app = express();
const bodyParse = require('body-parser');
const multer = require('multer');
const upload = multer();
const PORT = 5555;
let countID = 0;
let arrayListEmployee = [
    {
        id: ++countID,
        name: 'hieu',
        department: 'tutor'
    },
    {
        id: ++countID,
        name: 'hai',
        department: 'instructor'
    },
    {
        id: ++countID,
        name: 'tu',
        department: 'coach'
    }
]

//cau hinh views:
app.set('view engine', 'ejs');
app.set('views', './views');

//router
app.get('/', (req, res) => {
    res.render('viewListEmployee', {employees: arrayListEmployee})
})
app.get('/add', (req, res) => {
    res.render('add_Employee');
})
app.post('/add', upload.none(), (req, res) => {
    let {name, department} = req.body;
    if (name && department) {
        let newEmployee = {
            id: ++countID,
            name: name,
            department: department
        }
        arrayListEmployee.push(newEmployee);
        res.redirect('/')
    }
})
app.get('/delete', (req, res) => {
    let idNeedtoDel = parseInt(req.query.id);
    arrayListEmployee.forEach((value, index) => {
        if (value.id === idNeedtoDel) {
            // console.log(typeof value.id)
            // console.log(typeof idNeedtoDel)
            arrayListEmployee.splice(index, 1);
        }
    })
    res.redirect('/');
})

app.listen(PORT, 'localhost', () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})