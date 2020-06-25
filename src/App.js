import React from 'react';
import TableList from './Table/TableList'
import './App.css';
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { Create } from './People/Create';
import PersonInfo from "./People/PersonInfo"
import {Filters} from "./Filter/Filters";
import Awards from './Awards/Awards';
import {createBrowserHistory} from 'history';
import AddAwards from './Awards/AddAwards';
import EditPeople from './People/Edit';
import Login from './Login/Login';

const history = createBrowserHistory();
function App () {
    return (
      <BrowserRouter history={history}>
        <div>
        <Route exact path="/login" component={Login} />
          <Route exact path="/table" component={TableList} />
          <Route exact path="/people/create" component={Create} />
          <Route exact path="/people/info/:id" component={PersonInfo} />
          <Route exact path="/filter" component={Filters} />
          <Route exact path="/awards/:id" component={Awards} />
          <Route exact path="/awards/add/:id" component={AddAwards} />
          <Route exact path="/people/info/edit/:id" component={EditPeople} />
        </div>
      </BrowserRouter>
    );
}
export default App;
