import React from 'react';
import logo from './logo.svg';
import StudentList from './components/StudentList'
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <StudentList />
      </div>
    );
  }

}

export default App;
