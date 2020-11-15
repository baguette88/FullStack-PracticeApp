import React, { Component } from 'react'

const baseURL = 'http://localhost:3003'

export default class NewForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value })
    }

    handleSubmit(event) {
        event.preventDefault()
        fetch(baseURL + '/holidays', {
            method: 'POST',
            body: JSON.stringify({name: this.state.name}),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(data => {
            this.props.handleAddHoliday(data)
            this.setState({
                name: ''
            })
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor='name'>Name</label>
                <input 
                    type='text' 
                    id='name' 
                    name='name' 
                    onChange={this.handleChange} 
                    value={this.state.name}
                    placeHolder='add a holiday' />
                <input type='submit' value='Add Holiday'/>
            </form>
        )
    }
}
