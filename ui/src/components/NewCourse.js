import React from 'react';
import CardTypeSelection from './CardTypeSelection'


class NewCourse extends React.Component {
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
    }

    componentDidMount() {
        this.getCourses();
    }

    getCourses() {
        const typeUrl = `http://localhost:4321/cards/types`;
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

        const courseUrl = `http://localhost:4321/courses/list`;
        fetch(courseUrl)
        .then(res => res.json())
        .then(data => {
            console.log(data.data.rows)
            this.setState({
                courses: data.data.rows
            })
        })
        .catch(err => console.log(err))  
    }

    addCourse(){
        const url = `http://localhost:4321/courses/add`
        let schedule = '';
        for (const [key, value] of Object.entries(this.state.schedule)) {
            if(value){
                schedule += key
            }
        }
        console.log(schedule)
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

    render() {
        const mystyle = {
            height: '20%',

        };
        return (
            <div className = "p-0">        
                <div className = "card p-2">          
                    <div className="card-body">
                        <div className="form-group">
                            <input placeholder="名称:" type="text" className="mb-1 form-control" name="name" value={this.state.name} onChange={this.handleInput} />
                            {/* <input placeholder="上课(周):" type="text" className="mb-1 form-control input-sm col-md-5" name="schedule" value={this.state.schedule} onChange={this.handleInput} /> */}
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" name="1" onChange={this.handleCheckBox}/>
                                <label className="form-check-label col-md-1">
                                    一
                                </label>
                                <input className="form-check-input" type="checkbox" name="2" onChange={this.handleCheckBox}/>
                                <label className="form-check-label col-md-1">
                                    二
                                </label>
                                <input className="form-check-input" type="checkbox" name="3" onChange={this.handleCheckBox}/>
                                <label className="form-check-label col-md-1">
                                    三
                                </label>
                                <input className="form-check-input" type="checkbox" name="4" onChange={this.handleCheckBox}/>
                                <label className="form-check-label col-md-1">
                                    四
                                </label>
                                <input className="form-check-input" type="checkbox" name="5" onChange={this.handleCheckBox}/>
                                <label className="form-check-label col-md-1">
                                    五
                                </label>
                                <input className="form-check-input" type="checkbox" name="6" onChange={this.handleCheckBox}/>
                                <label className="form-check-label col-md-1">
                                    六
                                </label>
                                <input className="form-check-input" type="checkbox" name="7" onChange={this.handleCheckBox}/>
                                <label className="form-check-label col-md-1">
                                    日
                                </label>
                            </div>
                            <input placeholder="上课时间:" type="time" className="mb-1 form-control " name="starttime" value={this.state.starttime} onChange={this.handleInput} />
                            {this.state.length}
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="length" id="exampleRadios1" value="60" onChange={this.handleInput}/>
                                <label className="form-check-label">
                                    60 Mins
                                </label>
                                </div>
                                <div className="form-check">
                                <input className="form-check-input" type="radio" name="length" id="exampleRadios2" value="90" onChange={this.handleInput}/>
                                <label className="form-check-label">
                                    90 Mins
                                </label>
                                </div>
                                <div className="form-check disabled">
                                <input className="form-check-input" type="radio" name="length" id="exampleRadios3" value="120" onChange={this.handleInput}/>
                                <label className="form-check-label">
                                    120 Mins
                                </label>
                            </div>
                            <input placeholder="开始日期:" type="date" className="mb-1 form-control " name="startdate" value={this.state.startdate} onChange={this.handleInput} />
                            <input placeholder="结束日期:" type="date" className="mb-1 form-control " name="enddate" value={this.state.enddate} onChange={this.handleInput} />
                            <input placeholder="老师:" type="text" className="mb-1 form-control " name="teacher" value={this.state.teacher} onChange={this.handleInput} />
                            <input placeholder="地点:" type="text" className="mb-1 form-control " name="location" value={this.state.location} onChange={this.handleInput} />
                            <label className="form-check-label">类型</label>
                            <CardTypeSelection className="mb-1 " types={this.state.types} emitTypeId={this.updateCardType}></CardTypeSelection>
                        </div>
                    <button type="button" className="btn btn-outline-success  mr-1" onClick={this.addCourse}>提交</button>
                    </div>
                </div>
            </div>
        );
    }

}

export default NewCourse;
