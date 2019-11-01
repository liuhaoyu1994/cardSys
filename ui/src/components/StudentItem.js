import React from 'react';

class StudentItem extends React.Component {
  render() {
    return (
      <div className = "card p-2">
        <img className="card-img-top" src="thumb.jpg" style={{maxWidth: 150 + 'px'}} alt="photo"></img>
        <div className="card-body">
          <h5 className="card-title">{this.props.item.name}</h5>
          <p className="card-text"> points: {this.props.item.points}</p>
          <p className="card-text">{this.props.item.wechat}</p>
          <p className="card-text">{this.props.item.phone}</p>
        </div>
      </div>
    );
  }

}

export default StudentItem;
