import React from 'react';
import logo from './logo.svg';
import StudentList from './components/StudentList'
import Login from './components/Login'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"; 

import './App.css';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container-fluid">
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/students">
              <StudentList />
            </Route>
          </Switch>
          
        </div>
      </Router>
    );
  }

}

export default App;
