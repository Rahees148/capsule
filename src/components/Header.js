import React, { Component } from 'react'

class Header extends Component {
  styles = {
    header: {
      padding: 10,
      borderBottom: '1px solid #ccc',
      textAlign:'center'
    },
    imgWidth : {
      maxWidth: 250,
      float: 'left'
    },
    welcome:{
      float:'right',
      marginTop:8
    }
  }
  
  logoutHandler() {
    localStorage.removeItem('authentication');
  }
  
 render() {
  return (
      <header style={this.styles.header}>
         <img alt="Logo" src="/images/logo.png" style={this.styles.imgWidth} />
         <span style={this.styles.welcome}>Hi <b>{this.props.userName}</b> your in <b>{this.props.teamName}</b> Team | <a href='' onClick={this.logoutHandler.bind(this)}>Logout</a></span>
      </header>
    )
  }
}

 export default Header