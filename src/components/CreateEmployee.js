import React, {Component} from 'react';
import axios from 'axios';

export default class CreateEmployee extends Component {

    constructor(props) {
        super(props);

        this.onChangeEmployeeName = this.onChangeEmployeeName.bind(this);
        this.onChangeEmployeeCompany = this.onChangeEmployeeCompany.bind(this);
        this.onChangeEmployeeGroup = this.onChangeEmployeeGroup.bind(this);
        this.onChangeEmployeeCompensation = this.onChangeEmployeeCompensation.bind(this);
        this.onChangeCompensationFrequency = this.onChangeCompensationFrequency.bind(this);
        this.onChangeEmployeeDental = this.onChangeEmployeeDental.bind(this);
        this.onChangeEmployeeMedical = this.onChangeEmployeeMedical.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
            employee_name: '',
            employee_company: '',
            employee_group: '',
            employee_compensation: '',
            compensation_freq: '',
            employee_dental: '',
            employee_medical: ''
        }
    }
        onChangeEmployeeName(e) {
            this.setState({
                employee_name: e.target.value
            });
        }
        onChangeEmployeeCompany(e) {
            this.setState({
                employee_company: e.target.value
            });
        }
        onChangeEmployeeGroup(e) {
            this.setState({
                employee_group: e.target.value
            });
        }
        onChangeEmployeeCompensation(e) {
            this.setState({
                employee_compensation: e.target.value
            });
        }
        onChangeCompensationFrequency(e) {
            this.setState({
                compensation_freq: e.target.value
            });
        }
        onChangeEmployeeDental(e) {
            this.setState({
                employee_dental: e.target.value
            });
        }
        onChangeEmployeeMedical(e) {
            this.setState({
                employee_medical: e.target.value
            });
        }

        onSubmit(e) {
            e.preventDefault();

            console.log('Form Submitted');
            console.log(`Employee Name: ${this.state.employee_name}`);
            console.log(`Employee Company: ${this.state.employee_company}`);
            console.log(`Employee Group: ${this.state.employee_group}`);
            console.log(`Employee Compensation: ${this.state.employee_compensation}`);
            console.log(`Compensation Frequency: ${this.state.compensation_freq}`);
            console.log(`Employee Dental: ${this.state.employee_dental}`);
            console.log(`Employee Medical: ${this.state.employee_medical}`);

            const newEmployee = {
                employee_name: this.state.employee_name,
                employee_company: this.state.employee_company,
                employee_group: this.state.employee_group,
                employee_compensation: this.state.employee_compensation,
                compensation_freq: this.state.compensation_freq,
                employee_dental: this.state.employee_dental,
                employee_medical: this.state.employee_medical
            }

            axios.post('http://localhost:4000/employees/add', newEmployee)
                .then(res => console.log(res.data));

            this.setState({
                employee_name: '',
                employee_company: '',
                employee_group: '',
                employee_compensation: '',
                compensation_freq: '',
                employee_dental: '',
                employee_medical: '' 
            })
        }
    

    render() {
        return(
            <div style={{marginTop: 20}}>
                <h3>Add New Employee</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="row">
                    <div className="form-group col-6">
                        <label>Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.employee_name}
                                onChange={this.onChangeEmployeeName}
                                />
                    </div>
                    <div className="form-group col-6">
                        <label>Company: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.employee_company}
                                onChange={this.onChangeEmployeeCompany}
                                />
                    </div>
                    </div>


                    <div className="row">
                    
                    <div className="form-group col-3">
                        <label>Compensation: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.employee_compensation}
                                onChange={this.onChangeEmployeeCompensation}
                                />
                    </div>
                    <div className="form-group col-3">
                        <label>Compensation Frequency: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.compensation_freq}
                                onChange={this.onChangeCompensationFrequency}
                                />
                    </div>
                    
                    
                    <div className="form-group col-3">
                        <label>Medical: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.employee_medical}
                                onChange={this.onChangeEmployeeMedical}
                                />
                    </div>
                    <div className="form-group col-3">
                        <label>Dental: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.employee_dental}
                                onChange={this.onChangeEmployeeDental}
                                />
                    </div>
                    
                    </div>
                    <div className="row">
                    <div className="form-group col-3">
                        
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="freqOptions"
                                    id="partTime"
                                    value="Part Time"
                                    checked={this.state.employee_group==='Part Time'}
                                    onChange={this.onChangeEmployeeGroup}
                                    />
                            <label className="form-check-label">Part Time</label>
                        </div>
                        
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="freqOptions"
                                    id="fullTime"
                                    value="Full Time"
                                    checked={this.state.employee_group==='Full Time'}
                                    onChange={this.onChangeEmployeeGroup}
                                    />
                            <label className="form-check-label">Full Time</label>
                        </div>
                    </div>
                    <div className="form-group col-2">
                        <input type="submit" value="Add Employee" className="btn btn-primary" />
                    </div>
                    </div>
                </form>
            </div>
        )
    }
}