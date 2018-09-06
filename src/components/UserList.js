import React, { Component } from 'react'

class UserList extends Component {

    handleClick(event) {
        console.log(event.target);
        console.log(event.target.value);
        this.props.onFriendSelect(event.target.value);
    }
    render() {
        const styles = {
            container: {
                flex: 1,
                height:'40%',
                overflow: 'auto'
            },
            ul: {
                listStyle: 'none',
            },
            li: {
                marginTop: 13,
                marginBottom: 13,
                color: 'burlywood',
                cursor: 'pointer'
            }
        }
        return (
            <div
                style={{
                    ...this.props.style,
                    ...styles.container,
                }}
            >
                <ul style={styles.ul}>
                    {this.props.users.map((user) => (
                        <li key={user.id} value={user.id} style={styles.li} onClick={this.handleClick.bind(this)}>
                            {user.name}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default UserList