import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import Navigation from './common/navbar';
import UserForm from './users/user_form';
import { Index as MessagesIndex } from './messages/index';

import { Route, Switch } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <div>

        <Navigation />

        <div className="container" >
          <Switch>
            <Route exact path="/" component={UserForm} />
            <Route path="/users/:id/messages" component={MessagesIndex} />
          </Switch>
        </div>

      </div>
    );
  }
}
