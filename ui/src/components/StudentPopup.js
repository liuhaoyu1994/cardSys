import React from 'react';

class StudentPopup extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className = "card p-2">
          <img className="card-img-top m-auto" src="thumb.jpg" style={{maxWidth: 150 + 'px'}} alt="photo"></img>
          <div className="card-body">
            <h5 className="card-title">{this.props.item.name}</h5>
            <p className="card-text"> points: {this.props.item.points}</p>
            <p className="card-text">{this.props.item.wechat}</p>
            <p className="card-text">{this.props.item.phone}</p>
          </div>
          <div className="col-md-12">
            <button type="button" className="btn btn-outline-success col-md-5 mr-1" onClick={this.handleClick}>大课</button>
            <button type="button" className="btn btn-outline-info col-md-5" onClick={this.handleClick}>私教</button>
          </div>
        </div>
      </div>
    );
  }

}

export default StudentPopup;
