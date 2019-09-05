import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

import CreateEmployee from "./components/CreateEmployee";
import EditEmployee from "./components/EditEmployee";
import EmployeeList from "./components/EmployeeList";
import Calculate from "./components/Calculate";

function App() {
  return (
    <Router>
      <div className="container">

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" className="navbar-brand">Mitch's Payroll</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">Employees</Link>
              </li>
              <li>
                <Link to="/create" className="nav-link">Add Employee</Link>
              </li>
            </ul>
          </div>
        </nav>
        <Route path="/" exact component={EmployeeList} />
        <Route path="/edit/:id" component={EditEmployee} />
        <Route path="/create" component={CreateEmployee} />
        <Route path="/calculate/:id" component={Calculate} />
      </div>
    </Router>
  );
}

export default App;
