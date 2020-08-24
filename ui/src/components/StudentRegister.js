import React from 'react';

class StudentRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name:'',
      wechat:'',
      phone:''
    };
    this.handleInput = this.handleInput.bind(this);
    this.register = this.register.bind(this);


  }

  register(){
    var http = new XMLHttpRequest();
    const url = `http://localhost:4321/students/add`;
    const studentObj = {name: this.state.name, wechat: this.state.wechat, phone: this.state.phone}
    

    http.open('POST', url, true);
    http.setRequestHeader('Content-type', 'application/json');
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            alert(http.responseText);
        }
    }
    http.send(JSON.stringify(studentObj));
  }

  handleInput(event) {
    const target = event.target
    const name = target.name
    const value = target.value
    this.setState({[name]: value});
  }

  render() {
    return (
      <div>
        <div className = "card p-2">
          <img className="card-img-top m-auto" src="thumb.jpg" style={{maxWidth: 150 + 'px'}} alt="photo"></img>
          <div className="card-body">
            姓名:<input type="text" name="name" value={this.state.name} onChange={this.handleInput} />
            微信名:<input type="text" name="wechat" value={this.state.wechat} onChange={this.handleInput} />
            手机:<input type="text" name="phone" value={this.state.phone} onChange={this.handleInput} />
          </div>
          <button type="button" className="btn btn-outline-success col-md-5 mr-1" onClick={this.register}>提交</button>
        </div>
        
      </div>
    );
  }

}

export default StudentRegister;
