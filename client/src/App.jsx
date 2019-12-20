import React, {useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';

import Login from './components/user/Login';
import Register from './components/user/Register';
import EntryPage from './components/create/EntryPage';
import List from './components/list/List';
import Home from './components/Home';
import Edit from './components/edit/Edit';


export default function App() {

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.querySelector("meta[name=theme-color]").setAttribute('content', '#121212');
    }
  }, []);

  return (
    <Router>
        <div className='Wrapper'>
          <div className='App'>

            <Switch>
              <Route path='/login'> <Login /> </Route>
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