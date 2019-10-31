import React from 'react';

class StudentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  componentDidMount() {
    fetch('http://localhost:3000/')
    .then(res => res.json())
    .then((data) => {
      this.setState({ value: data.data })
      console.log(data.data)
    })
    .catch(console.log)
  }

  render() {
    return (
      <div>
        <h1> this is headline </h1>
      </div>
    );
  }

}

export default StudentList;
