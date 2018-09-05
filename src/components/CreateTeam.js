import React, { Component } from 'react'

class CreateTeam extends Component {
constructor(props) {
   super(props)
   this.state = {
     username: '',
     teamname: ''
   }
   this.onSubmit = this.onSubmit.bind(this)
   this.onChange = this.onChange.bind(this)
 }

 onSubmit(e) {
   e.preventDefault()
   this.props.onSubmit({
       username : this.state.username,
       teamname : this.state.teamname
   })
 }

 onChange(e) {
    this.setState({ teamname: e.target.value })
  }

 render() {
  return (
      <div>
        <div>
          <h2>Create Team</h2>
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              placeholder="TeamName"
              onChange={this.onChange}
            />
            <input type="submit" />
          </form>
        </div>
      </div>
    )
  }
}

 export default CreateTeam