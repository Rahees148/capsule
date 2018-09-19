import React, { Component } from 'react'
import Person from '@material-ui/icons/Person';

class Members extends Component {

    render() {
        const styles = {
            container: {
                margin: 10
            },
            ul: {
                listStyle: 'none',
                padding: 0,

            },
            li: {
                marginTop: 13,
                marginBottom: 13,
                color: '#4d394b',
            }
        }
        return (
            <div style={styles.container}>
                <h5>Members of Team</h5>
                <ul style={styles.ul}>
                    {this.props.members.map((user, index) => (
                        <li key={index} value={user} style={styles.li}>
                            <Person /> {user}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default Members