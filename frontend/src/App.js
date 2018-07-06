import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { simpleAction } from './actions/simpleAction'
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Category from './components/category'
import Community from './components/community'
import Contact from './components/contact'
import Donate from './components/donate'
import Recent from './components/recent'
import NavigationBar from './components/Header/index'

class App extends Component {

  state = {category: []}

  componentDidMount() {
    fetch('/v1/categories')
      .then(res => res.json())
    //fetch('/v1/cs/recent')
    .then(category => {  
        this.setState({ category })
        console.log(this.state.category)
      }
      );
  }

  simpleAction = (event) => {
    this.props.simpleAction();
   }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavigationBar />
            <div>
              <Route exact={true} path="/category" component={Category} />
              <Route exact={true} path="/recent" component={Recent} />
              <Route exact={true} path="/community" component={Community} />
              <Route exact={true} path="/contact" component={Contact} />
              <Route exact={true} path="/donate" component={Donate} />
            </div>
          <p>
            Category Status code : {this.state.category.status}
          </p>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  ...state
 })

const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction())
 })

export default connect(mapStateToProps, mapDispatchToProps)(App);
