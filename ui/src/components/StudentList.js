import React from 'react';
import StudentItem from './StudentItem'

class StudentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
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
        <h1> 学生列表 </h1>
        <div className="container-fluid">
          <div className="d-flex flex-wrap justify-content-md-between">
            {this.state.value.map((item,key) => 
              <StudentItem item={item} key={item.id} />
            )}
          </div>
        </div>
      </div>
    );
  }

}

export default StudentList;
