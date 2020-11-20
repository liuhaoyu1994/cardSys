import React from 'react';
import StudentItem from './StudentItem'
import StudentPopup from './StudentPopup'
import StudentRegister from './StudentRegister'
const axios = require('axios').default

class StudentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      target: {},
      showDetail: false,
      showRegisterForm: false
    };
    this.displayStudentDetail = this.displayStudentDetail.bind(this);
    this.refreshStudentList = this.refreshStudentList.bind(this);
    this.registerStudent = this.registerStudent.bind(this);
    this.getStudentImage = this.getStudentImage.bind(this);
  }

  displayStudentDetail(obj) {
    this.setState({target:obj}, () => {this.getStudentImage(); this.setState({showDetail:true})});
  }

  getStudentImage() {
    // const studentId = this.state.target.id
    // const url = `http://localhost:4321/students/${studentId}/image`; 
    // var res = fetch(url).then((response) => {
    //   const reader = response.body.getReader();
    //   const stream = new ReadableStream({
    //     start(controller) {
    //       function push() {
    //         reader.read().then(({ done, value }) => {
    //           if (done) {
    //             controller.close();
    //             return;
    //           }
    //           controller.enqueue(value);
    //           push();
    //         });
    //       };
    //       push();
    //     }
    //   });
    //   return new Response(stream, { headers: { "Content-Type": "image/png" } });
    // });
    // console.log(res)
  }

  registerStudent() {
    console.log(this.state.showRegisterForm)
    this.setState({showRegisterForm:!this.state.showRegisterForm})
  }

  refreshStudentList() {
    console.log('list to be refreshed')
    fetch('http://localhost:4321/students')
    .then(res => res.json())
    .then((data) => {
      console.log(data)
      this.setState({ students: data.data });
      this.setState({target:this.state.students[0]}, () => {this.setState({showDetail:true})});
    })    
  }

  async componentDidMount() {
    await this.refreshStudentList();
  }

  render() {
    return (
      <div>
        <h1> 学生列表 <button type="button" className="btn btn-outline-success" onClick={this.registerStudent}>注册</button></h1>
        {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/TS0tIAN0FmQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
        <div className="col-md-12 ">{this.state.showRegisterForm ? <StudentRegister refreshStudentList={this.refreshStudentList}/> : null}</div>
        <div className="container-fluid">
          <div className="row align-items-start">
            <div className="col-md-1"></div>
            <div className="col-md-5 p-0 d-flex flex-wrap justify-content-md-start">
              {this.state.students.map((item,key) =>
                <div className="col-md-3 p-0"><StudentItem item={item} key={item.id} emitEvent={this.displayStudentDetail} /></div>
              )}
            </div>
            <div className="col-md-5 ">{this.state.showDetail ? <StudentPopup item={this.state.target} refreshStudentList={this.refreshStudentList}/> : null}</div>
          </div>
        </div>

      </div>
    );
  }

}

export default StudentList;
