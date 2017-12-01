import React, { Component } from 'react';
import {
  Col,
  Row ,
  Panel,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Button
} from 'react-bootstrap';
import UsersRepository from '../../repositories/users_repository';

export default class UserForm extends Component {
  constructor(props) {
    super(props);

    this.state = { userId: '' };
  }

  handleInputChange(event) {
    this.setState({ userId: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const user = {
      user: { identifier: this.state.userId }
    };

    new UsersRepository().create(user).then((response) => {
      const goTo = `/users/${response.data.user.identifier}/messages`;
      this.props.history.push(goTo);
    }).catch((data) => {
      alert('Unable to create user');
    });
  }

  render() {
    return (
      <Row>
        <Col md={6} mdPush={3}>

          <Panel header="Create user" bsStyle="primary">
            <Form onSubmit={this.handleSubmit.bind(this)}>
              <FormGroup controlId="userId">
                <ControlLabel>User ID: </ControlLabel>
                <FormControl onChange={this.handleInputChange.bind(this)} />
              </FormGroup>

              <Button type='submit'>Create</Button>
            </Form>
          </Panel>

        </Col>
      </Row>
    );
  }
}
