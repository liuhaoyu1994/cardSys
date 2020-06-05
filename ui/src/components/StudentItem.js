import React from 'react';

class StudentItem extends React.Component {
  constructor(props) {
    super(props);
    this.emitStudentInfo = this.emitStudentInfo.bind(this);
  }
  emitStudentInfo(){
    this.props.emitEvent(this.props.item);
  }

  render() {
    return (
      <div className = "briefBox card mb-1 mr-2 p-2">        
        <div className="card-body">
          <h5 className="card-title">{this.props.item.name}</h5>
          <p className="card-text"> points: {this.props.item.points}</p>
          {/* <p className="card-text">{this.props.item.wechat}</p>
          <p className="card-text">{this.props.item.phone}</p> */}
        </div>
        <button type="button" className="btn btn-outline-success" onClick={this.emitStudentInfo}>打卡</button>
      </div>
    );
  }

}

export default StudentItem;
