import React from 'react';

class StudentItem extends React.Component {
  constructor(props) {
    super(props);
    this.displayStudentDetail = this.displayStudentDetail.bind(this);
  }
  displayStudentDetail(){
    this.props.emitEvent(this.props.item);
  }
  render() {
    const mystyle = {
      height: '100%',
      overflow: 'hidden',
      objectFit: 'cover'
    };
    return (
      <div className = "card p-2 m-1" style={{height: '300px'}}>        
          <img className="card-img-top p-auto m-auto" src={`http://localhost:4321/students/${this.props.item.id}/image`} style={mystyle} alt="photo"></img>
          <div className="card-body">
            <h5 className="card-title">{this.props.item.name}</h5>
            <p className="card-text"> points: {this.props.item.points}</p>
            {/* <p className="card-text">{this.props.item.wechat}</p>
            <p className="card-text">{this.props.item.phone}</p> */}
        </div>
        <button type="button" className="btn btn-outline-success" onClick={this.displayStudentDetail}>打卡</button>
      </div>
    );
  }

}

export default StudentItem;
