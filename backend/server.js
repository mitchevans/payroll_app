const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const employeeRoutes = express.Router();
const PORT = 4000;

let Employee = require('./payroll.model');
app.use(cors());
app.use(bodyParser.json());

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/payrolldb';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})

employeeRoutes.route('/').get(function (req, res) {
    Employee.find(function (err, employees) {
        if (err) {
            console.log(err);
        } else {
            res.json(employees);
        }
    });
});

employeeRoutes.route('/:id').get(function (req, res) {
    let id = req.params.id;
    Employee.findById(id, function (err, employee) {
        res.json(employee);
    });
});


employeeRoutes.route('/add').post(function (req, res) {
    let employee = new Employee(req.body);
    employee.save()
        .then(employee => {
            res.status(200).json({ 'employee': "employee added successfully" })
        })
        .catch(err => {
            res.status(400).send('adding new employee failed');
        });
});

employeeRoutes.route('/update/:id').post(function (req, res) {
    Employee.findById(req.params.id, function (err, employee) {
        if (!employee)
            res.status(404).send('data is not found');
        else
            employee.employee_name = req.body.employee_name;
        employee.employee_company = req.body.employee_company;
        employee.employee_group = req.body.employee_group;
        employee.employee_compensation = req.body.employee_compensation;
        employee.compensation_freq = req.body.compensation_freq;
        employee.employee_medical = req.body.employee_medical;
        employee.employee_dental = req.body.employee_dental;

        employee.save().then(employee => {
            res.json('Employee updated');
        })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

employeeRoutes.route('/delete/:id').delete(function (req, res) {
    Employee.findByIdAndRemove(req.params.id, (err, employee) => {

        if (err) return res.status(500).send(err);
        const response = {
            message: "Employee successfully deleted",
            name: employee.employee_name
        };
        return res.status(200).send(response);
    });
});


app.use('/employees', employeeRoutes);



app.listen(PORT, function () {
    console.log("Server is running in Port: " + PORT);
})

