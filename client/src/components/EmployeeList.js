import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Employee = props => (
    <tr>
        <td>{props.employee.employee_name}</td>
        <td>{props.employee.employee_company}</td>
        <td>{props.employee.employee_group}</td>
        <td>{props.employee.employee_compensation}</td>
        <td>{props.employee.compensation_freq}</td>
        <td>{props.employee.employee_medical}</td>
        <td>{props.employee.employee_dental}</td>
        <td>
            <Link to={"/edit/"+props.employee._id}>Edit </Link>
            <Link to={"/calculate/"+props.employee._id}>Calculate</Link>
        </td>
        
    </tr>
)

export default class EmployeeList extends Component {

    constructor(props) {
        super(props);
        this.state = {employees: []};
    }

    componentDidMount() {
        axios.get('/api/employees/')
            .then(response => {
                this.setState({employees: response.data});
            })
            .catch(function(error) {
                console.log(error);
            })
    }

    employeeList() {
        return this.state.employees.map(function(currentEmployee, i) {
            return <Employee employee={currentEmployee} key={i} />;
        });
    }

    render() {
        return(
            <div style={{marginTop: 20}}>
                <h3>Employees</h3>
                <table className="table table-striped" style={{marginTop: 20}}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Company</th>
                            <th>Group</th>
                            <th>Compensation</th>
                            <th>Compensation Frequency</th>
                            <th>Medical</th>
                            <th>Dental</th>
                            <th>Actions</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        { this.employeeList()}
                    </tbody>
                </table>
            </div>
        )
    }
}