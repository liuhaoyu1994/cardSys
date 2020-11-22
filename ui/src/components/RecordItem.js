import React from 'react';

class CourseItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(this.props.record.date),
    }
  }
  
  render() {
    return (
      <div className = "card p-0">        
        <div className="card-body p-2">
          <h5 className="card-title">{this.props.record.name}</h5>
          <p className="card-text"> {this.state.date.toString().slice(0,25)}</p>
        </div>
      </div>
    );
  }

}

export default CourseItem;
