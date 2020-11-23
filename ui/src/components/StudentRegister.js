import React from 'react';
const axios = require('axios').default

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

  async register(){

    const url = `/api/students/register`; 
    const studentObj = {name: this.state.name, wechat: this.state.wechat, phone: this.state.phone}
    // axios.post(url,studentObj)
    //   .then(function (res) {
    //     console.log(res)/*{this.props.refreshStudentList()}*/
    //   }) 
    //   .catch(function(error) {
    //     console.log(error);
    //   });
    fetch(url, {
      body: JSON.stringify(studentObj),
      method:'POST',
      mode:'cors',
      redirect: 'follow',
      headers: {
        'content-type': 'application/json'
      },
    })
    .then(() => {this.props.refreshStudentList()})
    .catch(console.log)
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
          {/* <img className="card-img-top m-auto" src="thumb.jpg" style={{maxWidth: 150 + 'px'}} alt="photo"></img> */}
          
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
