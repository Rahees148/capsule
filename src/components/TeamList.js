import React, { Component } from 'react'
import Lock from '@material-ui/icons/Lock';
import LockOpen from '@material-ui/icons/LockOpen';

class TeamList extends Component {

    handleClickEvent(event) {
        console.log('sjsj', event);
        this.props.onTeamChange(event.target.value);
    }
    render() {
        const styles = {
            container: {
                flex: 1,
                maxHeight:'40%',
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
                    {this.props.userTeams.map((team) => (
                        <li key={team.id} value={team.id} style={styles.li} onClick={this.handleClickEvent.bind(this)}>
                            {team.name}
                            { team.isPrivate ? <Lock /> : <LockOpen />}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default TeamList