import React from 'react';

class StudentRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentInfo:{
        name:'',
        wechat:'',
        cellphone:''
      },
    };
  }

  register(studentId){
    var http = new XMLHttpRequest();
    var url = `http://localhost:3000/students/add`;
    var data = JSON.stringify(this.state.studentInfo);
    http.open('POST', url, true);

    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            alert(http.responseText);
        }
    }
    http.send(data);
  }

  render() {
    return (
      <div>
        <div className = "card p-2">
          <img className="card-img-top m-auto" src="thumb.jpg" style={{maxWidth: 150 + 'px'}} alt="photo"></img>
          <div className="card-body">
            <input className="card-title">姓名: {this.state.studentInfo.name}</input>
            <p className="card-text">微信名: {this.state.studentInfo.name}</p>
            <p className="card-text">手机: {this.state.studentInfo.name}</p>
          </div>
          <div className="col-md-12">
            <button type="button" className="btn btn-outline-success col-md-5 mr-1" onClick={this.handleClick}>大课</button>
            <button type="button" className="btn btn-outline-info col-md-5" onClick={this.handleClick}>私教</button>
          </div>
        </div>
        <form onSubmit={this.buyCard} className="form-group">
          <label>
            种类:
            <select className="form-control" type="select" name="type">
              <option value={1}> 大课 </option>
              <option value={2}> 私教 </option>
            </select>
            课程数：
            <select className="form-control" type="select" name="remain">
              <option value={6}> 6次 </option>
              <option value={12}> 12次 </option>
            </select>
            {/* <input type="hidden" value={this.props.item.id} /> */}
          </label>
          <input type="submit" value="提交" />
        </form>
      </div>
    );
  }

}

export default StudentRegister;
