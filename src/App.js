import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UsernameForm from './components/UsernameForm'
import ChatScreen from './ChatsScreen'

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    screen: PropTypes.string,
  };

  constructor(props) {
    super(props)
    this.state = {
      currentUsername: '',
      screen: ''
    }
    this.onUsernameSubmitted = this.onUsernameSubmitted.bind(this)
  }

  onUsernameSubmitted(username) {
    this.props.dispatch({
      type: 'GET_USERNAME',
      username
    });
  }
  render() {
    if (this.props.currentUsername && !localStorage.getItem('authentication')) {
      localStorage.setItem('authentication', this.props.currentUsername);
    }
    const userLogin = localStorage.getItem('authentication');
    return (
      <div>{
        !userLogin ? <UsernameForm onSubmit={this.onUsernameSubmitted} /> : <ChatScreen currentUsername={userLogin} />
      }</div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentUsername: state.username,
  screen: state.screen
});

export default connect(mapStateToProps)(App);
