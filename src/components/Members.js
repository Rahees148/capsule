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
            },
            li: {
                marginTop: 13,
                marginBottom: 13,
                color: 'burlywood',
            }
        }
        return (
            <div style={styles.container}>
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