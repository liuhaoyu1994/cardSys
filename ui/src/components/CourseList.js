import React from 'react';
import CourseItem from './CourseItem'
import CardTypeSelection from './CardTypeSelection'


class CourseList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            typesDict:undefined,
            types:undefined,
            cardtypeid:undefined,
            typename: '',
            name: '',
            startdate: '',
            enddate: '',
            teacher: '',
            location: '',
            starttime: '',
            length: '',
            schedule:{'1':false, '2':false, '3':false, '4':false, '5':false, '6':false, '7':false,}
        };
        this.getCourses = this.getCourses.bind(this);  
        this.handleInput = this.handleInput.bind(this);
        this.handleCheckBox = this.handleCheckBox.bind(this);
        this.addCourse = this.addCourse.bind(this);
        this.updateCardType = this.updateCardType.bind(this);
        this.successAddRecord = this.successAddRecord.bind(this);
    }

    componentDidMount() {
        this.getCourses(this.props.typeid);
    }

    getCourses(typeid = 'all') {
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

        const courseUrl = `/api/courses/category?typeid=${typeid}`;
        fetch(courseUrl)
        .then(res => res.json())
        .then(data => {
            this.setState({
                courses: data.data.rows
            })
        })
        .catch(err => console.log(err))  
    }

    addCourse(){
        const url = `/api/courses/add`
        let schedule = '';
        for (const [key, value] of Object.entries(this.state.schedule)) {
            if(value){
                schedule += key
            }
        }
        const courseObj = {
            name:this.state.name, 
            schedule:schedule, 
            startdate:this.state.startdate, 
            enddate:this.state.enddate, 
            teacher:this.state.teacher, 
            location:this.state.location,
            typeid:this.state.cardtypeid,
            starttime:this.state.starttime,
            length:this.state.length
        };
        fetch(url, {
          body: JSON.stringify(courseObj),
          method:'POST',
          mode:'cors',
          redirect: 'follow',
          headers: {
            'content-type': 'application/json'
          },
        }).then(() => {this.getCourses()})
      }

    handleInput(event) {
        const target = event.target
        const name = target.name
        const value = target.value
        this.setState({[name]: value});
    }

    handleCheckBox(event) {
        const target = event.target
        const name = target.name
        const checked = target.checked
        let result = this.state.schedule
        if (checked) {
            result[name] = true
        } else {
            result[name] = false
        }
        this.setState({schedule: result});
    }

    updateCardType(id) {
        this.setState ({
          cardtypeid: id
        })
      }

    successAddRecord() {
        this.props.successAddRecord()
	}

    render() {
        const mystyle = {
            height: '20%',

        };
        return (
            <div className = "p-0">        
                <div className="d-flex flex-row">
                    {this.state.courses.map((course,key) =>
                        <div className="m-1" key={key}><CourseItem successAddRecord={this.successAddRecord} cardid={this.props.cardid} course={course}></CourseItem></div>
                    )}
                </div>  
            </div>
        );
    }

}

export default CourseList;
