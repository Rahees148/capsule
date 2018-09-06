import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Grid from  '@material-ui/core/Grid';

const styles = {
  gridContainer: {
    marginTop : "1em"
  },
  imgWidth : {
    maxWidth: 250,
    marginBottom: 30
  }
};

class UsernameForm extends Component {
constructor(props) {
   super(props)
   this.state = {
     username: '',
   }
   this.onSubmit = this.onSubmit.bind(this)
   this.handleChange = this.handleChange.bind(this)
 }

 onSubmit(e) {
  if(e.keyCode === 13) {
   this.props.onSubmit(this.state.username)
  }
 }

 handleChange(e) {
    this.setState({ username: e.target.value })
  }

 render() {
  return (
      <div className="App">
        <Grid container spacing={24} justify="center" style={styles.gridContainer} >
          <Grid item xs={6}>
          <div>
          <img alt="Logo" src="/images/logo.png" style={styles.imgWidth} />
          </div>
            <FormControl>
              <Input placeholder="Enter username" 
                onKeyDown={this.onSubmit.bind(this)}
                onChange={this.handleChange} />
            </FormControl>
          </Grid>
        </Grid>
      </div>
    )
  }
}

 export default UsernameForm