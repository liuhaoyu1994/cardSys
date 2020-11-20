import React from 'react';

class NewCardType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            types: [],
            typename: ''
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

    handleInput(event) {
        const target = event.target
        const name = target.name
        const value = target.value
        this.setState({[name]: value});
    }

    addCardType(){
        const url = `http://localhost:4321/cards/addType`
        const cardObj = {
            typename:this.state.typename,
        };
        fetch(url, {
          body: JSON.stringify(cardObj),
          method:'POST',
          mode:'cors',
          redirect: 'follow',
          headers: {
            'content-type': 'application/json'
          },
        }).then(() => {this.getCardTypes()})
      }
      

    render() {
        const mystyle = {
            height: '100%',
            overflow: 'hidden',
            objectFit: 'cover'
        };
        return (
            <div className = "card p-0">
                <div className="col-md-5 p-0 mr-2 mb-2">
                    {this.state.types.map((type,key) =>
                        <div>{type.typename}</div>
                    )}
                </div>          
                <div className = "card p-2">          
                    <div className="card-body">
                        <div className="form-group">
                            <label>类型:</label>
                            <input type="text" className="form-control" name="typename" value={this.state.typename} onChange={this.handleInput} />
                        </div>
                    <button type="button" className="btn btn-outline-success col-md-5 mr-1" onClick={this.addCardType}>提交</button>
                    </div>
                </div>
            </div>
        );
    }

}

export default NewCardType;
