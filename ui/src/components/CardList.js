import React from 'react';
import CardItem from './CardItem'
import CardTypeSelection from './CardTypeSelection'

class CardList extends React.Component {
  constructor(props) {
    super(props);
    let today = new Date();
    today = String(today.getFullYear() + 1) + '-' + String(today.getMonth() + 1) + '-' + String(today.getDate())
    this.state = {
      cardtypeid: undefined,
      credit: 10,
      expire: today,
      showBuyCardForm: false,
      cards: [],
      types: undefined,
      typesDict: undefined
    };
    this.handleInput = this.handleInput.bind(this);
    this.buyCard = this.buyCard.bind(this);
    this.switchshowBuyCardForm = this.switchshowBuyCardForm.bind(this);    
    this.getCards = this.getCards.bind(this);
    this.updateCardType = this.updateCardType.bind(this);

  }

  componentDidUpdate(prevProps){
    if (this.props.studentId !== prevProps.studentId) {
      this.getCards();
    }

  }

  componentDidMount() {
    this.getCards();
  }
  
  getCards() {
    const typeUrl = `/api/cards/types`;
    fetch(typeUrl)
    .then(res => res.json())
    .then(data => {
      let tempDict = {}
      data.data.rows.forEach(item => {
        tempDict[item.id] = item.typename.trim()
      })
      this.setState({
          cardtypeid: data.data.rows[0].id,
          types:data.data.rows,
          typesDict:tempDict
      })
    })
    .catch(err => console.log(err))  

    const url = `/api/students/${this.props.studentId}/cards`;  
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

  updateCardType(id) {
    this.setState ({
      cardtypeid: id
    })
  }


  buyCard(){
    const url = `/api/cards/add`
    const cardObj = {
      studentId:this.props.studentId,
      cardtypeid:this.state.cardtypeid,
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
          <CardTypeSelection types={this.state.types} emitTypeId={this.updateCardType}></CardTypeSelection>
          <label>次数:</label>
          <input type="number" className="form-control" name="credit" value={this.state.credit} onChange={this.handleInput} />
          <label>过期:</label>
          <input type="date" className="form-control" name="expire" value={this.state.expire} onChange={this.handleInput} />
        </div>
        <button type="button" className="btn btn-outline-success col-md-5 mr-1" onClick={this.buyCard}>提交</button>
      </div>
    </div>

    let cardList;
    if (this.state.cards !== undefined && this.state.typesDict !== undefined) {
      cardList = 
      <div className="col-md-12 p-0 d-flex flex-row align-items-start flex-wrap justify-content-md-start">
        {this.state.cards.map((card,key) =>
          <CardItem key={card.id} refreshCardList={this.getCards} typeid={card.cardtypeid} typename={this.state.typesDict[card.cardtypeid]} card={card}/>
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
