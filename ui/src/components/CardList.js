import React from 'react';
import CardItem from './CardItem'


class CardList extends React.Component {
  constructor(props) {
    super(props);
    let today = new Date();
    today = String(today.getFullYear() + 1) + '-' + String(today.getMonth() + 1) + '-' + String(today.getDate())
    this.state = {
      type: undefined,
      credit: 10,
      expire: today,
      showBuyCardForm: false,
      cards: [],
      types: []
    };
    this.handleInput = this.handleInput.bind(this);
    this.buyCard = this.buyCard.bind(this);
    this.switchshowBuyCardForm = this.switchshowBuyCardForm.bind(this);    
    this.getCards = this.getCards.bind(this);  
  }
  componentDidMount() {
    this.getCards();
  }
  

  getCards() {
    const typeUrl = `http://localhost:4321/cards/types`;
    fetch(typeUrl)
    .then(res => res.json())
    .then(data => {
      this.setState({
        types: data.data.rows
      })
    })
    .catch(err => console.log(err))  

    const url = `http://localhost:4321/students/${this.props.studentId}/cards`;  
    fetch(url)
    .then(res => res.json())
    .then(data => {
      this.setState({
        cards: data.data.rows
      })
    })
    .catch(err => console.log(err))
  }

  handleInput(event) {
    const target = event.target
    const name = target.name
    const value = target.value
    this.setState({[name]: value});
  }

  switchshowBuyCardForm() {
    this.setState ({
      showBuyCardForm: !this.state.showBuyCardForm
    })
  }


  buyCard(){
    const url = `http://localhost:4321/cards/add`
    console.log(this.props.studentId)
    const cardObj = {
      studentId:this.props.studentId,
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
    }).then(() => {this.switchshowBuyCardForm(); this.getCards()})
  }



  render() {
    const mystyle = {
      backgroundColor: "#f0a8af",
      borderRadius:"10px",
      padding:"1em"
    };
    const buyCardForm = 
    <div className = "card p-2">          
      <div className="card-body">
        <div className="form-group">
          <label>类型:</label>
          <select className="form-control" name="type" id="select1" value={this.state.type} onChange={this.handleInput}>
            {this.state.types.map((type,key) =>
              <option value={type.type}>{type.typename}</option>
            )}
          </select>      
          <label>次数:</label>
          <input type="number" className="form-control" name="credit" value={this.state.credit} onChange={this.handleInput} />
          <label>过期:</label>
          <input type="date" className="form-control" name="expire" value={this.state.expire} onChange={this.handleInput} />
          </div>
          <button type="button" className="btn btn-outline-success col-md-5 mr-1" onClick={this.buyCard}>提交</button>
        </div>
    </div>

    let cardList;
    if (this.state.cards !== undefined) {
      cardList = 
      <div className="col-md-12 p-0 d-flex flex-row align-items-start flex-wrap justify-content-md-start">
        {this.state.cards.map((card,key) =>
          <div className="col-md-5 p-0 mr-2 mb-2"><CardItem card={card} key={card.id}/></div>
        )}          
      </div>
    } else {
      cardList = <div>no data</div>
    }
      
    return (
      <div>
        <div style = {this.state.showBuyCardForm ? mystyle:null}>
          <button type="button" className={this.state.showBuyCardForm ? "btn btn-danger":"btn btn-success"} onClick={this.switchshowBuyCardForm}>{this.state.showBuyCardForm ? 'X':'购买课程卡'}</button>
          {this.state.showBuyCardForm ? buyCardForm:null}
        </div>
        {cardList}
        
      </div>
    );
  }
}

export default CardList;
