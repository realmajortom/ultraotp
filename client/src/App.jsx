import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './styles/App.css';

import Login from './components/user/Login';
import Register from './components/user/Register';
import EntryPage from './components/create/EntryPage';
import List from './components/list/List';
import Home from './components/Home';
import Edit from './components/edit/Edit';
import Screenshots from './components/Screenshots';


export default function App() {

  return (
    <Router>
        <div className='Wrapper'>
          <div className='App'>

            <Switch>
              <Route path='/screenshots'><Screenshots/></Route>
              <Route path='/login'> <Login/> </Route>
              <Route path='/register'> <Register /> </Route>
              <Route path='/new'> <EntryPage/> </Route>
              <Route path='/list'> <List/></Route>
              <Route path='/edit/:id'> <Edit/> </Route>
              <Route path='/'><Home/></Route>
            </Switch>

          </div>
        </div>
    </Router>
  );
}