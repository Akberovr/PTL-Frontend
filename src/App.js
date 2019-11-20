import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListEmployeeComponent from "./component/ListEmployeeComponent";
import "bootstrap/dist/css/bootstrap.min.css";



function App() {
  return (
    <div>
      <header>

          <Router>
              <div className="col-md-6">
                  <h1 className="text-center" style={style}>React User Application</h1>
                  <Switch>
                      <Route path="/" exact component={ListEmployeeComponent} />
                  </Switch>
              </div>
          </Router>

      </header>
    </div>
  );
}
const style = {
  color: 'red',
  margin: '10px'
}

export default App;
