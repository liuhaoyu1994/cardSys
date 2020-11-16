import React from 'react';
import CardList from './CardList'

class StudentPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      cardInfo:'a',
      selectedFile: null,
      updateImage: false,
      uploadedImage:'',
      showBuyCardDetail:false
    };
    this.deactivateStudent = this.deactivateStudent.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.switchImageUploadForm = this.switchImageUploadForm.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.getCards = this.getCards.bind(this);
  }

  uploadImage(file){
    const data = new FormData() 
    data.append('userid', this.props.item.id)
    data.append('file', this.state.selectedFile)
    const url = `http://localhost:4321/fileupload`
    fetch(url, {
      body: data,
      method:'POST',
      mode:'no-cors',
      redirect: 'follow',
      headers: {
        'content-type': 'application/json'
      },
    }).then(
      response => response.json() // if the response is a JSON object
    ).then(
      success => console.log(success) // Handle the success response object
    ).catch(
      error => console.log(error) // Handle the error response object
    );
  }
  

  onChangeHandler(input){
    // const reader = new FileReader()
    // reader.onload = function(e) {
    //   console.log(e.target.result)
    // };
    // reader.readAsDataURL(input.target.files[0]);
    this.setState({
      selectedFile: input.target.files[0],
      loaded: 0,
    }, () => {})
    
  }

  getCards() {
    const url = `http://localhost:4321/students/${this.props.item.id}/cards`;  
    fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data.data.rows)
      this.setState({
        cards: data.data.rows
      })
    })
    .then(
      this.setState ({
        showBuyCardDetail: !this.state.showBuyCardDetail
      })
    )

    .catch(console.log)
  }

  deactivateStudent() {
    const url = `http://localhost:4321/students/${this.props.item.id}`;  
    fetch(url, {
      method:'DELETE',
      mode:'cors',
      headers: {
        'content-type': 'application/json'
      },
    })
    .then(this.props.refreshStudentList())
    .catch(console.log)
  }

  switchImageUploadForm() {
    this.setState ({
      updateImage: !this.state.updateImage
    })
  }


  render() {
    const mystyle = {
      backgroundColor: "#f0a8af",
      borderRadius:"10px",
      padding:"1em"
    };
    const uploadForm = 
    <div className="p-5">
      <img src={this.uploadedImage}></img>
      <input type="file" name="file" onChange={this.onChangeHandler}/>
      <button type="button" className="btn btn-success" onClick={this.uploadImage}>Upload</button> 
    </div>
    let content;
    if (typeof(this.props.item) == 'undefined') {
      console.log(typeof(this.props.item))
      content = <span>没有学生信息！</span>
    } else {
      console.log(typeof(this.props.item))
      content = 
      <div className = "card p-2">
        <img className="card-img-top m-auto" src={`http://localhost:4321/students/${this.props.item.id}/image`} style={{maxWidth: 150 + 'px'}} alt="photo"></img>
        <div style = {this.state.updateImage ? mystyle:null}>
          <button type="button" className={this.state.updateImage ? "btn btn-danger":"btn btn-success"} onClick={this.switchImageUploadForm}>{this.state.updateImage ? 'X':'上传头像'}</button>
          {this.state.updateImage ? uploadForm:null}
        </div>
        <div className="card-body">
          <h5 className="card-title">姓名: {this.props.item.name}</h5>
          <p className="card-text">微信名: {this.props.item.wechat}</p>
          <p className="card-text">手机: {this.props.item.phone}</p>
          <p className="card-text">id: {this.props.item.id}</p>
        </div>
        <div className="col-md-12">
        <div>
          </div>
          <button type="button" className="btn btn-outline-success col-md-5 mr-1" onClick={this.getCards}>卡片列表</button>
          {/* <button type="button" className="btn btn-outline-success col-md-5 mr-1" onClick={this.showBuyCard}>买课</button> */}
          <button type="button" className="btn btn-outline-danger col-md-5" onClick={this.deactivateStudent}>删除</button>
        </div>
        <div className="container">
          {this.state.showBuyCardDetail ? <CardList cards={this.state.cards}></CardList>:null}
        </div>
      </div>
    }
    return (
      <div>
        {content}
      </div>
    );
  }

}

export default StudentPopup;
