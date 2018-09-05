import React, { Component } from 'react'

class TeamList extends Component {
constructor(props) {
   super(props)
   this.state = {
     username: this.props.userId
   }
   console.log('props', this.props);
 }

 componentDidMount(){
    fetch('http://localhost:3001/getTeam', {
        method: 'GET'
      })
      .then(response => {
          console.log('done.',response);
        })
      .catch(error => console.error('error', error))
 }
 render() {
  return (
      <div>
        <div>
          <h2>List of Team</h2>
          
        </div>
      </div>
    )
  }
}

 export default TeamList