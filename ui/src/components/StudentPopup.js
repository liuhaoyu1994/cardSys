import React from 'react';
const axios = require('axios').default

class StudentPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      cardInfo:'a'
    };
    this.buyCard = this.buyCard.bind(this);
    this.deactivateStudent = this.deactivateStudent.bind(this);
  }

  checkIn(studentId){
    fetch(`http://localhost:4321/cards/student/${studentId}`)
    .then(res => res.json())
    .then((data) => {
      console.log(data.data)
    })
    .catch(console.log)
  }

  
  buyCard(event){
    // console.log('cardInfo')
    // event.preventDefault();
    // var http = new XMLHttpRequest();
    // var url = `http://localhost:3000/cards/add`;
    // var data = JSON.stringify(cardInfo);
    // http.open('POST', url, true);

    // http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    // http.onreadystatechange = function() {
    //     if(http.readyState == 4 && http.status == 200) {
    //         alert(http.responseText);
    //     }
    // }
    // http.send(data);
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props.item.id !== prevProps.item.id) {
  //     this.checkIn(this.props.item.id)
  //   }
  // }

  // removeStudent() {
  //   const url = `http://localhost:4321/students/${this.props.item.id}`;    
  //   axios.delete(url).then((res)=> {console.log(res)});
  // }

  deactivateStudent() {
    
  }

  render() {
    return (
      <div>
        <div className = "card p-2">
          <img className="card-img-top m-auto" src="thumb.jpg" style={{maxWidth: 150 + 'px'}} alt="photo"></img>
          <div className="card-body">
            <h5 className="card-title">姓名: {this.props.item.name}</h5>
            <p className="card-text">微信名: {this.props.item.wechat}</p>
            <p className="card-text">手机: {this.props.item.phone}</p>
            <p className="card-text">id: {this.props.item.id}</p>
          </div>
          <div className="col-md-12">
            <button type="button" className="btn btn-outline-success col-md-5 mr-1" onClick={this.handleClick}>大课</button>
            <button type="button" className="btn btn-outline-info col-md-5" onClick={this.handleClick}>私教</button>
            <button type="button" className="btn btn-outline-danger col-md-5" onClick={this.deactivateStudent}>删除</button>
          </div>
        </div>

      </div>
    );
  }

}

export default StudentPopup;
