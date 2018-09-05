import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

class UsernameForm extends Component {
constructor(props) {
   super(props)
   this.state = {
     username: '',
   }
   this.onSubmit = this.onSubmit.bind(this)
   this.onChange = this.onChange.bind(this)
 }

 onSubmit(e) {
   e.preventDefault()
   this.props.onSubmit(this.state.username)
 }

 onChange(e) {
    this.setState({ username: e.target.value })
  }
  textWidth = {
    width: '100%'
  }
  alignCenter = {
    textAlign: 'center'
  }
  imgWidth = {
    maxWidth: 250
  }
  container = {
    padding: 20,
    textAlign: 'center',
    marginTop: 40
  }

 render() {
  return (
    <Grid container direction="row"  justify="center" >
      <Grid item xs={8} >
        <Paper style={this.container} >
        <img alt="Logo" src="/images/logo.png" style={this.imgWidth} />
          <form >
              {/* <input
                type="text"
                placeholder="Your full name"
                
              /> */}
              <TextField
                id="textarea"
                label="Enter your Name"
                placeholder="Placeholder"
                style = {this.textWidth}
                margin="normal"
                onChange={this.onChange}
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

 export default UsernameForm