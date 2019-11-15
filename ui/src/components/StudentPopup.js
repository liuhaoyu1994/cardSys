import React from 'react';

class StudentPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: []
    };
    this.buyCard = this.buyCard.bind(this);
  }

  checkIn(studentId){
    fetch(`http://localhost:3000/cards/student/${studentId}`)
    .then(res => res.json())
    .then((data) => {
      console.log(data.data)
    })
    .catch(console.log)
  }

  
  buyCard(event){
    //console.log(cardInfo)
    event.preventDefault();
    // var http = new XMLHttpRequest();
    // var url = `http://localhost:3000/cards/add`;
    // var data = JSON.stringify(cardInfo);
    // http.open('POST', url, true);

    // //Send the proper header information along with the request
    // http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    // http.onreadystatechange = function() {//Call a function when the state changes.
    //     if(http.readyState == 4 && http.status == 200) {
    //         alert(http.responseText);
    //     }
    // }
    // http.send(data);
  }

  componentDidUpdate(prevProps) {
    if (this.props.item.id !== prevProps.item.id) {
      this.checkIn(this.props.item.id)
    }
  }

  render() {
    return (
      <div>
        <div className = "card p-2">
          <img className="card-img-top m-auto" src="thumb.jpg" style={{maxWidth: 150 + 'px'}} alt="photo"></img>
          <div className="card-body">
            <h5 className="card-title">{this.props.item.name}</h5>
            <p className="card-text">{this.props.item.wechat}</p>
            <p className="card-text">{this.props.item.phone}</p>
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
            <input type="hidden" value={this.props.item.id} />
          </label>
          <input type="submit" value="提交" />
        </form>
      </div>
    );
  }

}

export default StudentPopup;
