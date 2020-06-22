import React from 'react';
import TableList from './Table/TableList'
import './App.css';
import { Route, Link } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { Create } from './People/Create';
import {PersonInfo} from "./People/PersonInfo"
import {Filters} from "./Filter/Filters";
import Awards from './People/Awards';
import {createBrowserHistory} from 'history';

const history = createBrowserHistory();
function App () {
    return (
      <BrowserRouter history={history}>
        <div>
          <Route exact path="/Table" component={TableList} />
          <Route exact path="/People/Create" component={Create} />
          <Route exact path="/People/Info/:id" component={PersonInfo} />
          <Route exact path="/Filter" component={Filters} />
          <Route exact path="/Awards/:id" component={Awards} />
        </div>
      </BrowserRouter>
    );
}
export default App;
