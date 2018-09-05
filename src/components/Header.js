import React, { Component } from 'react'

class Header extends Component {
  styles = {
    padding: 10,
    borderBottom: '1px solid #ccc'
  }
  imgWidth = {
    maxWidth: 250
  }
 render() {
  return (
      <header style={this.styles}>
         <img alt="Logo" src="/images/logo.png" style={this.imgWidth} />
      </header>
    )
  }
}

 export default Header