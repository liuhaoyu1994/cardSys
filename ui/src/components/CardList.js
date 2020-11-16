import React from 'react';
import CardItem from './CardItem'


class CardList extends React.Component {
  constructor(props) {
    super(props);
    let today = new Date();
    today = String(today.getFullYear() + 1) + '-' + String(today.getMonth() + 1) + '-' + String(today.getDate())
    this.state = {
      type: 0,
      credit: 10,
      expire: today
    };
    this.handleInput = this.handleInput.bind(this);
    this.buyCard = this.buyCard.bind(this);

  }

  handleInput(event) {
    const target = event.target
    const name = target.name
    const value = target.value
    this.setState({[name]: value});
  }

  buyCard(){
    const url = `http://localhost:4321/cards/add`
    const cardObj = {
      type:this.state.type,
      credit:this.state.credit,
      expire:this.state.expire,
    };
    fetch(url, {
      body: JSON.stringify(cardObj),
      method:'POST',
      mode:'cors',
      redirect: 'follow',
      headers: {
        'content-type': 'application/json'
      },
    })
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


  render() {
    return (
      <div>
        <div className = "card p-2">          
          <div className="card-body">
            <div className="form-group">
              <label>类型:</label>
              <select className="form-control" name="type" id="select1" value={this.state.type} onChange={this.handleInput}>
                <option value='0'>大课</option>
                <option value='1'>小课</option>
              </select>
              <label>次数:</label>
              <input type="number" className="form-control" name="credit" value={this.state.credit} onChange={this.handleInput} />
              <label>过期:</label>
              <input type="date" className="form-control" name="expire" value={this.state.expire} onChange={this.handleInput} />
              </div>
              <button type="button" className="btn btn-outline-success col-md-5 mr-1" onClick={this.buyCard}>提交</button>
            </div>
        </div>
        <div className="col-md-12 p-0 d-flex flex-row align-items-start flex-wrap justify-content-md-start">
          {this.props.cards.map((card,key) =>
            <div className="col-md-5 p-0 mr-2 mb-2"><CardItem card={card} key={card.id}/></div>
          )}          
      </div>
      </div>
    );
  }

}

export default CardList;
