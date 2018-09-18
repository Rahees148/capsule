import React, { Component } from 'react'
import Chatkit from '@pusher/chatkit'

import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Lock from '@material-ui/icons/Lock';
import LockOpen from '@material-ui/icons/LockOpen';
import PersonAdd from '@material-ui/icons/PersonAdd';
import People from '@material-ui/icons/People';
import Popover from '@material-ui/core/Popover';


import MessageList from './components/MessageList'
import TeamList from './components/TeamList'
import UserList from './components/UserList'
import Members from './components/Members'
import SendMessageForm from './components/SendMessageForm'
import TypingIndicator from './components/TypingIndicator'
import Header from './components/Header'




class ChatScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUser: {},
            currentRoom: {},
            messages: [],
            usersWhoAreTyping: [],
            teamname: '',
            teamprivacy: false,
            currentUserTeams: {},
            currentUserFriends: {},
            currentRoomId: 15474299,
            addUser: false,
            addusername: '',
            anchorEl: null,
            teamMembers: []
        }
        this.sendMessage = this.sendMessage.bind(this)
        this.sendTypingEvent = this.sendTypingEvent.bind(this)
        this.handlePrivacyChange = this.handlePrivacyChange.bind(this)
        this.handleAddUserClick = this.handleAddUserClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.createTeam = this.createTeam.bind(this)
        this.addUser = this.addUser.bind(this);
        this.handleAddUserChange = this.handleAddUserChange.bind(this)
        this.chatManager = '';
    }

    componentDidMount() {
        this.chatMangerInit();
        this.chatManagerLoad(this.state.currentRoomId);
    }

    handleChange(e) {
        this.setState({ teamname: e.target.value })
    }
    handleAddUserChange(e) {
        this.setState({ addusername: e.target.value })
    }
    handleAddUserClick (e) {
        this.setState({addUser: true});
    }
    handlePrivacyChange(e, isChecked) {
        this.setState({ teamprivacy: isChecked })
    }
    addUser(e) {
        if(e.keyCode === 13) {
            if (this.state.addusername) {
                this.state.currentUser.addUserToRoom({
                    userId: this.state.addusername,
                    roomId: this.state.currentRoomId
                })
                    .then(() => {
                    console.log('Added to room')
                    })
                    .catch(err => {
                    console.log(`Error adding to room: ${err}`)
                    })
                this.setState({addUser: false});
            } else {
                this.setState({addUser: false});
            }
        }
    }
    createTeam(e) {
        if(e.keyCode === 13) {
            this.state.currentUser
                .createRoom({
                name: this.state.teamname,
                private: this.state.teamprivacy,
                addUserIds: []
            }).then(room => {
                this.setState({ teamname: '' })
                let newList = this.state.currentUserTeams;
                newList.push(room);
                this.setState({ currentUserTeams: newList });
            })
            .catch(err => {
                console.log(`Error creating room ${err}`)
            })
        }
    }
    sendTypingEvent() {
        this.state.currentUser
            .isTypingIn({ roomId: this.state.currentRoomId })
            .catch(error => console.error('error', error))
    }

    sendMessage(text) {
        this.state.currentUser.sendMessage({
            text,
            roomId: this.state.currentRoomId,
        })
        this.chatManagerLoadRoomMessages(this.state.currentRoomId);
    }

    chatMangerInit() {
        this.chatManager = new Chatkit.ChatManager({
            instanceLocator: 'v1:us1:a8fa5b17-5ffe-43b4-bd2c-468d2eaabcc8',
            userId: this.props.currentUsername,
            tokenProvider: new Chatkit.TokenProvider({
                url: '/authenticate',
            }),
        })
    }
    chatManagerLoad(roomId) {
        this.chatManager
            .connect()
            .then(currentUser => {
                const friends = currentUser.users.filter(function (el) { return el.id !== currentUser.id; });
                this.setState({ currentUser })
                this.setState({ currentUserTeams: currentUser.rooms })
                this.setState({ currentUserFriends: friends})
                if (currentUser.rooms.length > 0) this.getTeamMembers(roomId)
                return currentUser.subscribeToRoom({
                    roomId: roomId,
                    messageLimit: 100,
                    hooks: {
                        onNewMessage: message => {
                            this.setState({
                                messages: [...this.state.messages, message],
                            })
                        },
                        onUserStartedTyping: user => {
                            this.setState({
                                usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name],
                            })
                        },
                        onUserStoppedTyping: user => {
                            this.setState({
                                usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                                    username => username !== user.name
                                ),
                            })
                        },
                    },
                })
            })
            .then(currentRoom => {
                this.setState({ currentRoom })
                if (this.state.currentUserTeams.length === 0) {
                    this.chatManager.disconnect()
                    this.chatMangerInit();
                    this.chatManagerLoad(this.state.currentRoomId);  
                } 
            })
            .catch(error => console.error('error', error))
    }
    chatManagerLoadRoomMessages(roomId) {
        this.chatManager
        .connect()
        .then(currentUser => {
            this.setState({ currentUser })
            this.setState({ currentUserTeams: currentUser.rooms })
            return currentUser.fetchMessages({
                roomId: roomId,
            }).then(messages => {
                this.setState({
                    messages: messages,
                });
              })
              .catch(err => {
                console.log(`Error fetching messages: ${err}`)
              })
        })
        .catch(error => console.error('error', error))
    }

    onTeamChange(id) {
        const newRoom = this.state.currentUserTeams.filter(function (el) { return el.id === id; });
        this.setState({currentRoomId : id });
        this.setState({currentRoom : newRoom[0] });
       // newRoom[0].userIds.length > 0 ? this.getTeamMembers(id) : '';
        this.chatManagerLoadRoomMessages(id);
    }

    getTeamMembers(id, flag=false) {
        const teamData = this.state.currentUserTeams.filter(function (el) { return el.id === id; });
        const data = (flag) ? teamData[0] : teamData[0];
        this.setState({ teamMembers: data.userIds});
    }

    onFriendSelect(friendId) {
        console.log('ff',friendId);
    }
    handleClick = event => {
        this.setState({
          anchorEl: event.currentTarget,
        });
      };
    
      handleClose = () => {
        this.setState({
          anchorEl: null,
        });
      };

    render() {
        const open = Boolean(this.state.anchorEl);
        const styles = {
            container: {
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }, 
            chatContainer: {
                display: 'flex',
                flex: 1,
            },
            whosOnlineListContainer: {
                width: '260px',
                flex: 'none',
                padding: 20,
                backgroundColor: '#4d394b',
                color: 'white',
                h2Title: {
                    marginBottom: '10px'
                },
                textField: {
                    marginBottom: '10px'
                }
            },
            createTeam : {
                backgroundColor: '#ffffff',
                margin: '-20px -20px 20px',
                padding: 10,
                borderRight: '1px solid #4d394b'
            },
            chatListContainer: {
                padding: '20px 0 0 20px',
                width: '85%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'white',
                h2Title: {
                    margin: '10px 0',
                    backgroundColor: 'darkgray',
                },
                addUser: {
                    marginRight: 20,
                    textAlign: 'end',
                    cursor: 'pointer',
                    float: 'right'
                },
                listUser: {
                    marginRight: 20,
                    float: 'right',
                }
            },
        }
        return (
            <div style={styles.container}>
            {this.state && this.state.currentUser.id &&
                <Header teamName={this.state.currentRoom.name} userName={this.state.currentUser.id } />
            }
                <div style={styles.chatContainer}>
                    <aside style={styles.whosOnlineListContainer}>
                        <div style={styles.createTeam}>
                            <FormControl>
                                <Input placeholder="Create Team"   
                                value={this.state.teamname}
                                onKeyDown={this.createTeam}
                                onChange={this.handleChange} />
                            </FormControl>
                            <FormControlLabel control={
                                <Checkbox icon={<LockOpen />} checkedIcon={<Lock />}  onChange={this.handlePrivacyChange} value="checkedH" />}
                            />
                        </div>
                            { this.state.currentUserTeams.length > 0 ? 
                                <h4 style={styles.whosOnlineListContainer.h2Title}>Teams</h4> : '' }
                            { this.state.currentUserTeams.length > 0 ? 
                                <TeamList userTeams={this.state.currentUserTeams} onTeamChange={this.onTeamChange.bind(this)} />
                                : ''}
                            { this.state.currentUserFriends.length > 0 ? 
                            <h4 style={styles.whosOnlineListContainer.h2Title}> Friends </h4> : ''}
                            { this.state.currentUserFriends.length > 0 ? 
                                <UserList users={this.state.currentUserFriends} onFriendSelect={this.onFriendSelect.bind(this)} />
                                : ''}
                    </aside>
                    <section style={styles.chatListContainer}>
                        {/* <h2 style={styles.chatListContainer.h2Title}>{this.state.currentRoom.name}</h2> */}
                        { this.state.currentUserTeams.length > 0 ?    
                            <div>
                            <div style={styles.chatListContainer.addUser} onClick={this.handleAddUserClick}>
                            {this.state.addUser ? 
                                <FormControl>
                                    <Input placeholder="Add user"   
                                    value={this.state.addusername}
                                    onKeyDown={this.addUser}
                                    onChange={this.handleAddUserChange} />
                                </FormControl> : <PersonAdd /> }
                            </div>
                            <div style={styles.chatListContainer.listUser}>
                            <People
                            aria-owns={open ? 'simple-popper' : null}
                            aria-haspopup="true"
                            variant="contained"
                            onClick={this.handleClick}>
                                    </People>
                                    <Popover
                                        id="simple-popper"
                                        open={open}
                                        anchorEl={this.state.anchorEl}
                                        onClose={this.handleClose}
                                        anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                        }}
                                        transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                        }}
                                    >
                                    Members of Team <br />
                                    <Members members={this.state.teamMembers}/>
                                    </Popover>
                                </div>
                            </div>
                             : ''}
                        <MessageList
                            messages={this.state.messages}
                            style={styles.chatList}
                        />
                        <TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping} />
                        <SendMessageForm
                            onSubmit={this.sendMessage}
                            onChange={this.sendTypingEvent}
                        />
                    </section>
                </div>
            </div>
        )

    }
}

export default ChatScreen