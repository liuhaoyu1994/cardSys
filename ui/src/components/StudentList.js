import React from 'react';
import StudentItem from './StudentItem'
import StudentPopup from './StudentPopup'

class StudentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
      target: {},
      showDetail: false
    };
    this.handleEmitEvent = this.handleEmitEvent.bind(this);
  }

  handleEmitEvent(obj) {
    this.setState({target:obj}, () => {this.setState({showDetail:true})});
  }

  popupWindow(){}

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
          <div className="row align-items-start">
            <div className="col-md-1"></div>
            <div className="col-md-8 p-0 d-flex flex-wrap justify-content-md-start">
              {this.state.value.map((item,key) => 
                <div className="col-md-3 p-0"><StudentItem item={item} key={item.id} emitEvent={this.handleEmitEvent}/></div>
              )}
            </div>
            <div className="col-md-2 ">{this.state.showDetail ? <StudentPopup item={this.state.target} /> : null}</div>
          </div>
        </div>
        
      </div>
    );
  }

}

export default StudentList;
