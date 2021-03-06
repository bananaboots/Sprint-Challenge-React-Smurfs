import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';

import './App.css';
import Nav from './Nav';
import SmurfForm from './components/SmurfForm';
import SmurfUpdate from './components/SmurfUpdate';
import Smurfs from './components/Smurfs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
 
  componentDidMount() {
    axios
      .get('http://localhost:3333/smurfs')
      .then(response => {
        this.setState({
          smurfs: response.data
        })
      })
      .catch(err => console.log(err))
  }

  addSmurf = (newSmurf) => {
    axios
      .post('http://localhost:3333/smurfs', newSmurf)
      .then(response => {
        this.setState({
          smurfs: response.data
        })
      })
      .catch(err => console.log(err));
  }

  updateSmurf = (updatedSmurf, id) => {
    axios
      .put(`http://localhost:3333/smurfs/${id}`, updatedSmurf)
      .then(response => {
        this.setState({
          smurfs: response.data,
        })
      })
      .catch(err => console.log(err))
  }

  deleteSmurf = (id) => {
    axios
      .delete(`http://localhost:3333/smurfs/${id}`)
      .then(response => {
        this.setState({
          smurfs: response.data,
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="App">
        <Nav />
        <Route path="/smurf-form" render={props => <SmurfForm {...props} add={this.addSmurf} />} />
        <Route path="/update/:id" render={props => <SmurfUpdate {...props} update={this.updateSmurf} />} />
        <Route exact path="/" render={props => <Smurfs {...props} smurfs={this.state.smurfs} delete={this.deleteSmurf} />} />
      </div>
    );
  }
}

export default App;
