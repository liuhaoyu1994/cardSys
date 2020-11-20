import React from 'react';

class NewCourse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            types: [],
            courses: [],
            name:'', 
            schedule:'', 
            startdate:'', 
            enddate:'', 
            teacher:'', 
            location:'',
            typeid:0,
            starttime:0,
            length:0
        };
        this.getCardTypes = this.getCardTypes.bind(this);  
        this.handleInput = this.handleInput.bind(this);
        this.addCardType = this.addCardType.bind(this);
    }

    componentDidMount() {
        this.getCardTypes();
    }

    getCardTypes() {
        const typeUrl = `http://localhost:4321/cards/types`;
        fetch(typeUrl)
        .then(res => res.json())
        .then(data => {
            console.log(data.data.rows)
            this.setState({
                types: data.data.rows
            })
        })
        .catch(err => console.log(err))  
    }

    getCourses() {
        const typeUrl = `http://localhost:4321/courses/list`;
        fetch(typeUrl)
        .then(res => res.json())
        .then(data => {
            console.log(data.data.rows)
            this.setState({
                courses: data.data.rows
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

    createCourse(){
        const url = `http://localhost:4321/courses/add`
        const courseObj = {
            name:this.state.name, 
            schedule:this.state.schedule, 
            startdate:this.state.startdate, 
            enddate:this.state.enddate, 
            teacher:this.state.teacher, 
            location:this.state.location,
            typeid:this.state.typeid,
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
        }).then(() => {this.getCardTypes()})
      }
      

    render() {
        return (
            <div className = "card p-0">
                <div className="col-md-5 p-0 mr-2 mb-2">
                    {this.state.courses.map((course,key) =>
                        <div>
                            <div>{course.name}</div>
                            <div>{course.schedule}</div>
                            <div>{course.startdate}</div>
                            <div>{course.enddate}</div>
                            <div>{course.teacher}</div>
                            <div>{course.location}</div>
                            <div>{course.typeid}</div>
                            <div>{course.starttime}</div>
                            <div>{course.length}</div>
                        </div>
                    )}
                </div>          
                <div className = "card p-2">          
                    <div className="card-body">
                        <div className="form-group">
                            <label>课程名:</label>
                            <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.handleInput} />
                            <label>日程:</label>
                            <input type="text" className="form-control" name="schedule" value={this.state.schedule} onChange={this.handleInput} />
                            <label>开始日期:</label>
                            <input type="text" className="form-control" name="startdate" value={this.state.startdate} onChange={this.handleInput} />
                            <label>结束日期:</label>
                            <input type="text" className="form-control" name="enddate" value={this.state.enddate} onChange={this.handleInput} />
                            <label>老师:</label>
                            <input type="text" className="form-control" name="teacher" value={this.state.teacher} onChange={this.handleInput} />
                            <label>地点:</label>
                            <input type="text" className="form-control" name="location" value={this.state.location} onChange={this.handleInput} />
                            <label>类型:</label>
                            <select className="form-control" name="typeid" id="select1" value={this.state.typeid} onChange={this.handleInput}>
                                {this.state.types.map((type,key) =>
                                    <option value={type.id}>{type.typename}</option>
                                )}
                            </select>
                            <label>开始时间:</label>
                            <input type="text" className="form-control" name="starttime" value={this.state.location} onChange={this.handleInput} />
                            <label>时长:</label>
                            <input type="text" className="form-control" name="length" value={this.state.location} onChange={this.handleInput} />
                        </div>
                    <button type="button" className="btn btn-outline-success col-md-5 mr-1" onClick={this.addCardType}>提交</button>
                    </div>
                </div>
            </div>
        );
    }

}

export default NewCourse;
