import React from 'react';
import CheckInForm from './NewRecord'
import RecordList from './RecordList'
class CardItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCheckInForm:false,
      showCheckHistory:false
    }
    this.deleteCard = this.deleteCard.bind(this);
    this.switchShowCheckInForm = this.switchShowCheckInForm.bind(this)
    this.switchShowCheckHistory = this.switchShowCheckHistory.bind(this)

  }

  deleteCard(){
    const url = `/api/cards/${this.props.card.id}`;  
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

  switchShowCheckInForm() {
    this.setState ({
      ShowCheckInForm: !this.state.ShowCheckInForm
    })
  }

  switchShowCheckHistory() {
    this.setState ({
      showCheckHistory: !this.state.showCheckHistory
    })
  }


  render() {
    const mystyle = {
      height: '100%',
      overflow: 'hidden',
      objectFit: 'cover'
    };
    return (
      <div className = {`${this.state.ShowCheckInForm || this.state.showCheckHistory? 'col-md-12':'col-md-5'} card p-0 mr-1`}>        
          <div className="card-body p-2">
            <h5 className="card-title">{this.props.typename}</h5>
            <p className="card-text"> 余额: {this.props.card.credit}</p>
            <p className="card-text"> 过期日期: {this.props.card.expire.slice(0,10)}</p>
            <div>{this.state.ShowCheckInForm? <CheckInForm refreshCardList={this.props.refreshCardList} cardid={this.props.card.id} typeid={this.props.typeid}/> : null}</div>
            <div>{this.state.showCheckHistory? <RecordList cardid={this.props.card.id}/> : null}</div>
        </div>
        {/* <button type="button" className="btn btn-outline-danger" onClick={this.deleteCard}>删除</button> */}
        <div className="col-md-12 p-0 d-flex flex-row align-items-middle flex-wrap justify-content-md-around">
          <button type="button" className={`btn btn-outline-${this.state.ShowCheckInForm? 'danger':'info'}`} onClick={this.switchShowCheckInForm}> 
            {this.state.ShowCheckInForm? '关闭':'课程列表'} </button>
          <button type="button" className={`btn btn-outline-${this.state.showCheckHistory? 'danger':'warning'}`} onClick={this.switchShowCheckHistory}> 
            {this.state.showCheckHistory? '关闭':'上课历史'} </button>
        </div>
      </div>
    );
  }

}

export default CardItem;
