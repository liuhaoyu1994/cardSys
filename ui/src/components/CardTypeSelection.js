import React from 'react';

class CardTypeSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        cardtypeid: undefined,
    };
    this.updateSelection = this.updateSelection.bind(this);
  }
  updateSelection(event){
    this.props.emitTypeId(event.target.value);
  }
  render() {
    const myStyle = {
        width: '20%'
    }
    let cardTypeList;
    if (this.props.types !== undefined) {
      cardTypeList = 
      <select style = {myStyle} className="form-control" name="cardtypeid" id="select1" value={this.state.cardtypeid} onChange={this.updateSelection}>
        {this.props.types.map((type,key) =>
          <option key={key} value={type.id}>{type.typename}</option>
        )}
      </select>
    } else {
      cardTypeList = <div>no data</div>
    }
    return (
      <div>        
          <div className="form-group">
            {cardTypeList}
        </div>
      </div>
    );
  }

}

export default CardTypeSelection;
