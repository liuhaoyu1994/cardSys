import React from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          email:'',
          password:'',
        };
        this.login = this.login.bind(this);
        this.handleInput = this.handleInput.bind(this);

    }
    async login (){

        const url = `/api/auth`; 
        const authInfo = {email: this.state.email, password: this.state.password}
        // axios.post(url,studentObj)
        //   .then(function (res) {
        //     console.log(res)/*{this.props.refreshStudentList()}*/
        //   }) 
        //   .catch(function(error) {
        //     console.log(error);
        //   });
        fetch(url, {
          body: JSON.stringify(authInfo),
          method:'POST',
          mode:'cors',
          redirect: 'follow',
          headers: {
            'content-type': 'application/json'
          },
        })
        .then(res => console.log(res))
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
      <div className = "briefBox card mb-1 mr-2 p-2">        
        <div className = "card p-2">
          <img className="card-img-top m-auto" src="thumb.jpg" style={{maxWidth: 150 + 'px'}} alt="photo"></img>
          <div className="card-body">
            Email:<input type="text" name="email" value={this.state.email} onChange={this.handleInput} />
            Password:<input type="text" name="password" value={this.state.password} onChange={this.handleInput} />
          </div>
          <button type="button" className="btn btn-outline-success col-md-5 mr-1" onClick={this.login}>提交</button>
        </div>
      </div>
    );
  }

}

export default Login;
