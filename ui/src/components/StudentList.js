import React from 'react';
import StudentItem from './StudentItem'
import StudentPopup from './StudentPopup'
import StudentRegister from './StudentRegister'

class StudentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
      target: {},
      showDetail: false
    };
    this.emitStudentInfo = this.emitStudentInfo.bind(this);
  }

  emitStudentInfo(obj) {
    this.setState({target:obj}, () => {this.setState({showDetail:true})});
  }
  
  registerStudent() {

  }

  componentDidMount() {
    fetch('http://localhost:4321/')
    .then(res => res.json())
    .then((data) => {
      this.setState({ value: data.data })
      console.log('success')
    })
    .catch(console.log)
    .then(()=> {
      this.setState({target:this.state.value[0]}, () => {this.setState({showDetail:true})});
    })
  }

  render() {
    return (
      <div>
        <h1> 学生列表 <button type="button" className="btn btn-outline-success" onClick={this.registerStudent}>注册</button></h1>
        <StudentRegister />
        <div className="container-fluid">
          <div className="row align-items-start">
            <div className="col-md-1"></div>
            <div className="col-md-4 p-0 d-flex flex-wrap justify-content-md-start">
              {this.state.value.map((item,key) => 
                <div className="col-md-4 p-0"><StudentItem item={item} key={item.id} emitEvent={this.emitStudentInfo}/></div>
              )}
            </div>
            <div className="col-md-6 ">{this.state.showDetail ? <StudentPopup item={this.state.target} /> : null}</div>
          </div>
        </div>
        
      </div>
    );
  }

}

export default StudentList;
