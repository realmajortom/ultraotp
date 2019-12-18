import React, {useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './styles/App.css';

import Login from './components/user/Login';
import Register from './components/user/Register';
import EntryPage from './components/create/EntryPage';
import List from './components/list/List';
import Home from './components/Home';
import Edit from './components/edit/Edit';


const JwtContext = React.createContext(localStorage.getItem('JWT'));


export default function App() {
  const [Jwt, setJwt] = useState(localStorage.getItem('JWT'));

  return (
    <Router>
      <JwtContext.Provider value={Jwt}>
        <div className='Wrapper'>
          <div className='App'>

            <Switch>
              <Route path='/login'> <Login setJwt={setJwt}/> </Route>
              <Route path='/register'> <Register setJwt={setJwt}/> </Route>
              <Route path='/new'> <EntryPage/> </Route>
              <Route path='/list'> <List/></Route>
              <Route path='/edit/:id'> <Edit/> </Route>
              <Route path='/'><Home/></Route>
            </Switch>

          </div>
        </div>
      </JwtContext.Provider>
    </Router>
  );
}