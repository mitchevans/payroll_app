import React, { Component } from 'react';
import axios from 'axios';

export default class EditEmployee extends Component {

    constructor(props) {
         super(props);

        this.onChangeEmployeeName = this.onChangeEmployeeName.bind(this);
        this.onChangeEmployeeCompany = this.onChangeEmployeeCompany.bind(this);
        this.onChangeEmployeeGroup = this.onChangeEmployeeGroup.bind(this);
        this.onChangeEmployeeCompensation = this.onChangeEmployeeCompensation.bind(this);
        this.onChangeCompensationFreq = this.onChangeCompensationFreq.bind(this);
        this.onChangeEmployeeMedical = this.onChangeEmployeeMedical.bind(this);
        this.onChangeEmployeeDental = this.onChangeEmployeeDental.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            employee_name: '',
            employee_company: '',
            employee_group: '',
            employee_comensation: '',
            compensation_freq: '',
            employee_medical: '',
            employee_dental: ''
        }
    }

    componentDidMount() {
        axios.get('/api/employees/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    employee_name: response.data.employee_name,
                    employee_company: response.data.employee_company,
                    employee_group: response.data.employee_group,
                    employee_compensation: response.data.employee_compensation,
                    compensation_freq: response.data.compensation_freq,
                    employee_medical: response.data.employee_medical,
                    employee_dental: response.data.employee_dental
                })
            })
            .catch(function (error) {
                console.log(error)
            })
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

    onChangeCompensationFreq(e) {
        this.setState({
            compensation_freq: e.target.value
        });
    }

    onChangeEmployeeMedical(e) {
        this.setState({
            employee_medical: e.target.value
        });
    }

    onChangeEmployeeDental(e) {
        this.setState({
            employee_dental: e.target.value
        });
        
    }

    handleDelete(e) {
        e.preventDefault();
        const obj = {
            employee_name: this.state.employee_name,
            employee_company: this.state.employee_company,
            employee_group: this.state.employee_group,
            employee_compensation: this.state.employee_compensation,
            compensation_freq: this.state.compensation_freq,
            employee_medical: this.state.employee_medical,
            employee_dental: this.state.employee_dental
        };
        axios.delete('/api/employees/delete/'+this.props.match.params.id, obj)
        .then(res => console.log(res.data));

            this.props.history.push('/');
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            employee_name: this.state.employee_name,
            employee_company: this.state.employee_company,
            employee_group: this.state.employee_group,
            employee_compensation: this.state.employee_compensation,
            compensation_freq: this.state.compensation_freq,
            employee_medical: this.state.employee_medical,
            employee_dental: this.state.employee_dental
        };

        axios.post('/api/employees/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));

            this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h3>Edit Employee</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.employee_name}
                            onChange={this.onChangeEmployeeName}
                        />
                    </div>
                    <div className="form-group">
                        <label>Company: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.employee_company}
                            onChange={this.onChangeEmployeeCompany}
                        />
                    </div>
                    <div className="form-group">

                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio"
                                name="freqOptions"
                                id="partTime"
                                value="Part Time"
                                checked={this.state.employee_group === 'Part Time'}
                                onChange={this.onChangeEmployeeGroup}
                            />
                            <label className="form-check-label">Part Time</label>
                        </div>

                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio"
                                name="freqOptions"
                                id="fullTime"
                                value="Full Time"
                                checked={this.state.employee_group === 'Full Time'}
                                onChange={this.onChangeEmployeeGroup}
                            />
                            <label className="form-check-label">Full Time</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Compensation: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.employee_compensation}
                            onChange={this.onChangeEmployeeCompensation}
                        />
                    </div>
                    <div className="form-group">
                        <label>Compensation Frequency: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.compensation_freq}
                            onChange={this.onChangeCompensationFreq}
                        />
                    </div>
                    <div className="form-group">
                        <label>Medical: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.employee_medical}
                            onChange={this.onChangeEmployeeMedical}
                        />
                    </div>
                    <div className="form-group">
                        <label>Dental: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.employee_dental}
                            onChange={this.onChangeEmployeeDental}
                        />
                    </div>
                    <br />
                    <div className="row">
                    <div className="form-group col-2">
                        <input type="submit" value="Update Employee" className="btn btn-primary" />
                    </div>
                    <div className="form-group col-2">
                        <input type="button" onClick={this.handleDelete.bind(this)} name="delete_button" value="Delete Employee" className="btn btn-danger" />
                    </div>
                    </div>

                </form>
            </div>
        )
    }
}