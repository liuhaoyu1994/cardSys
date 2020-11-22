import React from 'react';
import CourseList from './CourseList'
class CheckInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCheckInForm:false
		}
		this.successAddRecord = this.successAddRecord.bind(this)

	}
	
	successAddRecord() {
		this.props.refreshCardList()
	}

  render() {
    return (
		<div>
			<CourseList successAddRecord={this.successAddRecord} cardid={this.props.cardid} typeid={this.props.typeid}></CourseList>					
		</div>
    );
  }

}

export default CheckInForm;
