import React from 'react';
import logo from './logo.svg';
import StudentList from './components/StudentList'
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1> this is headline </h1>
        <StudentList />
      </div>
    );
  }

}

export default App;
