import React from 'react';
import RecordItem from './RecordItem'

class RecordList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            records: [],
        };
        this.getRecords = this.getRecords.bind(this);  
    }

    componentDidMount() {
        this.getRecords();
    }

    getRecords() {
        const recordsUrl = `/api/cards/${this.props.cardid}/records`;
        fetch(recordsUrl)
        .then(res => res.json())
        .then(data => {
            console.log(data.data.rows)
            this.setState({
                records:data.data.rows,
            })
        })
        .catch(err => console.log(err))  
    }

    render() {
        const mystyle = {
            height: '20%',

        };
        return (
            <div className = "p-0">        
                <div className="d-flex flex-row">
                    {this.state.records.map((record,key) =>
                        <div className="m-1" key={key}><RecordItem record={record}></RecordItem></div>
                    )}
                </div>  
            </div>
        );
    }

}

export default RecordList;
