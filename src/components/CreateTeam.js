import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class CreateTeam extends Component {
constructor(props) {
   super(props)
   this.state = {
     username: this.props.userId,
     teamname: ''
   }
   this.onSubmit = this.onSubmit.bind(this)
   this.onChange = this.onChange.bind(this)
 }

 onSubmit(e) {
   e.preventDefault()
   this.props.onSubmit({
       username : this.state.username,
       teamname : this.state.teamname
   })
 }

 onChange(e) {
    this.setState({ teamname: e.target.value })
  }
  backgroundColor = {
    backgroundColor: '#fff',
    boxShadow:'none'
  }
  container = {
    backgroundColor: '#fff',
    padding: 10,
    border: '1px solid #000000',
    color:'#000000',
    marginBottom: 40
  }
  textWidth = {
    width: '100%'
  }

 render() {
  return (
    <Grid style={this.container} container direction="row"  justify="center" >
    <Grid item xs={12} >
      <Paper style={this.backgroundColor} >
          <h2>Create Team</h2>
          <form >
            <TextField
                id="textarea"
                label="Team Name"
                placeholder="Team Name"
                multiline
                style = {this.textWidth}
                margin="normal"
                onChange={this.onChange}
              />
               <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.checkedA}
                    // onChange={this.handleChange('checkedA')}
                    value="checkedA"
                  />
                }
                label="Private"
              />
              <Button onClick={this.onSubmit} variant="contained" color="primary" >
                Submit
              </Button>
            
          </form>
        </Paper>
      </Grid>
      </Grid>
    )
  }
}

 export default CreateTeam