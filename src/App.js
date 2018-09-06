import React, { Component } from 'react'
import UsernameForm from './components/UsernameForm'
import ChatScreen from './ChatsScreen'

class App extends Component {
  constructor() {
        super()
        this.state = {
          currentUsername: '',
          currentScreen: 'WhatIsYourUsernameScreen'
        }
        this.onUsernameSubmitted = this.onUsernameSubmitted.bind(this)
      }
    
      onUsernameSubmitted(username) {
        fetch('http://localhost:3001/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username }),
        })
          .then(response => {
            this.setState({
              currentUsername: username,
              currentScreen: 'ChatScreen'
            })
            localStorage.setItem('username', this.state.currentUsername);
          })
          .catch(error => console.error('error', error))
      }
  render() {
    const userLogin = localStorage.getItem('username');
    if (!userLogin) {
      return <UsernameForm onSubmit={this.onUsernameSubmitted} />
    }
   if (userLogin) {
     return <ChatScreen currentUsername={userLogin} />
   }
  }
}

export default App
