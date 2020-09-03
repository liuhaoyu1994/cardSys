import React from 'react';
import StudentItem from './StudentItem'
import StudentPopup from './StudentPopup'
import StudentRegister from './StudentRegister'
const axios = require('axios').default

class StudentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
      target: {},
      showDetail: false,
      showRegisterForm: false
    };
    this.emitStudentInfo = this.emitStudentInfo.bind(this);
    this.refreshStudentList = this.refreshStudentList.bind(this);
    this.registerStudent = this.registerStudent.bind(this);
  }

  emitStudentInfo(obj) {
    this.setState({target:obj}, () => {this.setState({showDetail:true})});
  }
  
  registerStudent() {
    console.log(this.state.showRegisterForm)
    this.setState({showRegisterForm:!this.state.showRegisterForm})
  }

  async refreshStudentList() {
    const response = await axios.get('http://localhost:4321/students')
    this.setState({ value: response.data.data })
    this.setState({target:this.state.value[0]}, () => {this.setState({showDetail:true})});
  }

  async componentDidMount() {
    await this.refreshStudentList();
  }

  render() {
    return (
      <div>
        <h1> 学生列表 <button type="button" className="btn btn-outline-success" onClick={this.registerStudent}>注册</button></h1>
        <div className="col-md-12 ">{this.state.showRegisterForm ? <StudentRegister /> : null}</div>
        <div className="container-fluid">
          <div className="row align-items-start">
            <div className="col-md-1"></div>
            <div className="col-md-4 p-0 d-flex flex-wrap justify-content-md-start">
              {this.state.value.map((item,key) => 
                <div className="col-md-4 p-0"><StudentItem item={item} key={item.id} emitEvent={this.emitStudentInfo} /></div>
              )}
            </div>
            <div className="col-md-6 ">{this.state.showDetail ? <StudentPopup item={this.state.target} refreshStudentList={this.refreshStudentList}/> : null}</div>
          </div>
        </div>
        
      </div>
    );
  }

}

export default StudentList;
