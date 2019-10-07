import React, { Component } from 'react';
import axios from 'axios';



export default class Calculate extends Component {
    
    constructor(props) {
        super(props);
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
        axios.get('http://localhost:5000/api/employees/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    employee_name: response.data.employee_name,
                    employee_company: response.data.employee_company,
                    employee_group: response.data.employee_group,
                    employee_compensation: response.data.employee_compensation,
                    compensation_freq: response.data.compensation_freq,
                    employee_medical: response.data.employee_medical,
                    employee_dental: response.data.employee_dental,
                    
                })
            })
            .catch(function (error) {
                console.log(error)
            })
            
    }

  

    render() {

        var comp_freq_factor = 0;
        if (this.state.compensation_freq === "monthly") {
            comp_freq_factor = 12;
        } 
        else if (this.state.compensation_freq === "bi-weekly") {
            comp_freq_factor = 26;
        }
        else if (this.state.compensation_freq === "annual") {
            comp_freq_factor = 1;
        }
        else if (this.state.compensation_freq === "bi-monthly") {
            comp_freq_factor = 24;
        }

        var gross = Number(this.state.employee_compensation) * comp_freq_factor/12;

// annual taxable wages
        var an_tax_wages =  gross * 12
                                    - this.state.employee_dental * 12 
                                    - this.state.employee_medical * 12;

// State Personal Inome Tax (single person California)        
        var state_tax = 0;
        if (an_tax_wages > 0 && an_tax_wages <= 8544) {
            state_tax = (0 + (an_tax_wages - 0) * .011)/12;
        } 
        if (an_tax_wages > 8544 && an_tax_wages <= 20255) {
            state_tax = (93.98 + (an_tax_wages - 8544) * .022)/12;
        } 
        if (an_tax_wages > 20255 && an_tax_wages <= 31969) {
            state_tax = (351.62 + (an_tax_wages - 20255) * .044)/12;
        } 
        if (an_tax_wages > 31969 && an_tax_wages <= 44377) {
            state_tax = (867.04 + (an_tax_wages - 31969) * .066)/12;
        } 
        if (an_tax_wages > 44377 && an_tax_wages <= 56085) {
            state_tax = (1685.97 + (an_tax_wages - 44377) * .088)/12;
        } 
        if (an_tax_wages > 56085 && an_tax_wages <= 286492) {
            state_tax = (2716.27 + (an_tax_wages - 56085) * .1023)/12;
        } 
        if (an_tax_wages > 286492 && an_tax_wages <= 343788) {
            state_tax = (26286.91 + (an_tax_wages - 286492) * .1133)/12;
        } 
        if (an_tax_wages > 343788 && an_tax_wages <= 572980) {
            state_tax = (32778.55 + (an_tax_wages - 343788) * .1243)/12;
        } 
        if (an_tax_wages > 572980 && an_tax_wages <= 1000000) {
            state_tax = (61267.12 + (an_tax_wages - 572980) * .1353)/12;
        } 
        if (an_tax_wages > 1000000 && an_tax_wages <= 99000000) {
            state_tax = (119042.93 + (an_tax_wages - 1000000) * .1463)/12;
        } 
// Federal Inome Tax (single person)        
    var fed_tax = 0;
if (an_tax_wages > 0 && an_tax_wages <= 9700) {
    fed_tax = (0 + (an_tax_wages - 0) * .10)/12;
} 
if (an_tax_wages > 9700 && an_tax_wages <= 39475) {
    fed_tax = (970 + (an_tax_wages - 9700) * .12)/12;
} 
if (an_tax_wages > 39475 && an_tax_wages <= 84200) {
    fed_tax = (4543 + (an_tax_wages - 39475) * .22)/12;
} 
if (an_tax_wages > 84200 && an_tax_wages <= 160725) {
    fed_tax = (14382.5 + (an_tax_wages - 84200) * .24)/12;
} 
if (an_tax_wages > 160725 && an_tax_wages <= 204100) {
    fed_tax = (32748.5 + (an_tax_wages - 160725) * .32)/12;
} 
if (an_tax_wages > 204100 && an_tax_wages <= 510300) {
    fed_tax = (46628.5 + (an_tax_wages - 204100) * .35)/12;
} 
if (an_tax_wages > 510300 && an_tax_wages <= 99000000) {
    fed_tax = (153798.5 + (an_tax_wages - 510300) * .37)/12;
} 
        


        return (
            <div style={{ marginTop: 20 }}>
                <div className="card">
                    <div className="card-header">
                        <h3>Payslip</h3>
                    </div>
                    <div className="card-body">
                    <div className="row">
                        <div className='col-6'>
                        <p>Worker: {this.state.employee_name}</p>
                        <p>Company: {this.state.employee_company}</p>
                        <p>Period Schedule: {this.state.compensation_freq}</p>
                        <p>Period: Jan-2019</p>
                        <p>Gross: ${gross}</p>
                        <p>Net: </p>
                        <p>Compensation: ${this.state.employee_compensation}</p>
                        </div>
                        
                        
                            <div className="col-6">
                            <h5>Gross</h5>
                            <p className="card-text">Base Pay: ${gross}</p>
                            <hr />
                            <h5>Deductions and Taxes </h5>

                            <p className="card-text">Medical: {this.state.employee_medical}</p>
                            <p className="card-text">Dental: {this.state.employee_dental}</p>
                            <p className="card-text">State Withholding: ${state_tax}</p>
                            <p className="card-text">Federal Withholding: ${fed_tax}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        )
    }
}