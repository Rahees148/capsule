const { createStore } = require('redux');
const ChatApp = require('.');
const should = require('chai').should();

describe('ChatApp unit testing', function() {

  it('should GET_USERNAME', function() {
    const currState = {
        username: ''
    };

    const store = createStore(ChatApp, currState);

    const action = {
      type: 'GET_USERNAME',
      username : 'Rayees'
    };

    store.dispatch(action);

    store.getState().should.have.property('username');
    store.getState().should.have.property('username').and.equal('Rayees');
  });

  it('should SET_USERNAME', function() {

    const currState = {
        username: ''
    };

    const store = createStore(ChatApp, currState);

    const action = {
      type: 'SET_USERNAME',
      username : 'Rayees'
    };

    store.dispatch(action);

    store.getState().should.have.property('username');
    store.getState().should.have.property('username').and.equal('Rayees');
  });

});