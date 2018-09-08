function CapsuleApp(currState, action) {

  switch(action.type) {
    case 'GET_USERNAME':
      return Object.assign({}, {
        username: action.username
      })

    case 'SET_USERNAME':
      return Object.assign({}, {
        username: action.username,
        screen: 'ChattingSection'
      })

    default:
      return currState;
  }
}

module.exports = CapsuleApp;
