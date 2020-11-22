import React from 'react';

class CardItem extends React.Component {
  constructor(props) {
    super(props);
    this.deleteCard = this.deleteCard.bind(this);
  }

  deleteCard(){
    const url = `http://localhost:4321/cards/${this.props.card.id}`;  
    fetch(url, {
      method:'DELETE',
      mode:'cors',
      headers: {
        'content-type': 'application/json'
      },
    })
    .then(() => {this.props.refreshCardList()})
    .catch(console.log)
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
            <h5 className="card-title">{this.props.typename}</h5>
            <p className="card-text"> 余额: {this.props.card.credit}</p>
            <p className="card-text"> 过期日期: {this.props.card.expire.slice(0,10)}</p>
        </div>
        <button type="button" className="btn btn-outline-danger" onClick={this.deleteCard}>删除</button>
      </div>
    );
  }

}

export default CardItem;
