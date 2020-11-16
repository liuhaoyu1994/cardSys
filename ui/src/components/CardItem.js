import React from 'react';

class CardItem extends React.Component {
  constructor(props) {
    super(props);
    this.displayCardDetail = this.displayCardDetail.bind(this);
  }
  displayCardDetail(){
    this.props.emitEvent(this.props.item);
  }
  render() {
    const mystyle = {
      height: '100%',
      overflow: 'hidden',
      objectFit: 'cover'
    };
    return (
      <div className = "card p-0">        
          <div className="card-body p-2">
            <h5 className="card-title">{this.props.card.type === 0 ? "大课":"私课"}</h5>
            <p className="card-text"> credit: {this.props.card.credit}</p>
            <p className="card-text"> studentid: {this.props.card.studentid}</p>
            <p className="card-text"> expire: {this.props.card.expire}</p>
        </div>
        <button type="button" className="btn btn-outline-success" onClick={this.displayCardDetail}>打卡</button>
      </div>
    );
  }

}

export default CardItem;
