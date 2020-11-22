import React from 'react';
import logo from './logo.svg';
import StudentList from './components/StudentList'
import NewCardType from './components/NewCardType'
import NewCourse from './components/NewCourse'
import CourseList from './components/CourseList'
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
        <a href="/students" className="btn btn-outline-success">students</a>
        <a href="/cards" className="btn btn-outline-success">cards</a>
        <a href="/courses" className="btn btn-outline-success">courses</a>
        <div className="container-fluid">
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/students">
              <StudentList />
            </Route>
            <Route path="/cards">
              <NewCardType />
            </Route>
            <Route path="/courses">
              <NewCourse />
              <CourseList />
            </Route>
          </Switch>
          
        </div>
      </Router>
    );
  }

}

export default App;
