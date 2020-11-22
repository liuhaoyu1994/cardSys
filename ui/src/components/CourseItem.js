import React from 'react';

class CourseItem extends React.Component {
  constructor(props) {
    super(props);
    this.deleteCard = this.deleteCard.bind(this);
  }

  deleteCard(){

  }

  render() {
    const mystyle = {
      height: '100%',
      overflow: 'hidden',
      objectFit: 'cover'
    };
    const dayMapping = {
      '1':'周一',
      '2':'周二',
      '3':'周三',
      '4':'周四',
      '5':'周五',
      '6':'周六',
      '7':'周日',
    }
    const days = this.props.course.schedule.trim().split('');
    let displayDays = '';
    days.forEach (element => {
      displayDays += dayMapping[element] + ','
    }) 
    let endTime = this.props.course.starttime.split(':');
    const durationHour = Math.floor(this.props.course.length/60)
    const durationMinute = Math.floor(this.props.course.length - durationHour*60)
    let carry = 0
    carry = Math.floor((parseInt(endTime[1]) + durationMinute)/60)
    const endMinute = Math.floor(parseInt(endTime[1]) + durationMinute - carry*60)
    const endHour = parseInt(endTime[0]) + durationHour + carry
    
    return (
      <div className = "card p-0">        
        <div className="card-body p-2">
          <h5 className="card-title">{this.props.course.name}</h5>
          <p className="card-text"> 上课: {displayDays}</p>
          <p className="card-text"> 上课时间: {this.props.course.starttime}</p>
          <p className="card-text"> 下课时间: {endHour}:{endMinute == 0 ? '00':endMinute} (时长: {this.props.course.length})</p>
          <p className="card-text"> 开始日期: {this.props.course.startdate.slice(0,10)}</p>
          <p className="card-text"> 结束日期: {this.props.course.enddate.slice(0,10)}</p>
          <p className="card-text"> 老师: {this.props.course.teacher}</p>
          <p className="card-text"> 地点: {this.props.course.location}</p>
          <p className="card-text"> 类型: {this.props.course.typename}</p>
        </div>
        <button type="button" className="btn btn-outline-danger" onClick={this.deleteCard}>删除</button>
      </div>
    );
  }

}

export default CourseItem;
