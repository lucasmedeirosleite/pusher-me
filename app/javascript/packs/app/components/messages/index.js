import React, { Component } from 'react';
import {
  Col,
  Row,
  Panel,
  Table,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Button
} from 'react-bootstrap';
import Pusher from '../common/pusher';
import MessagesRepository from '../../repositories/messages_repository';

export class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: '',
      message: '',
      messages: []
    };
  }

  channelName() {
    const { id } = this.props.match.params;
    return `private-channel-user-${id}`;
  }

  params() {
    return {
      userId: this.props.match.params.id,
      token: '12345565'
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.setState({ userId: id });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.message) {
      new MessagesRepository()
        .create(this.channelName(), this.state.message)
        .then(() => console.log('Message sent'))
        .catch(() => console.log('Message not sent'));
    }
  }

  handleInputChange(event) {
    this.setState({ message: event.target.value });
  }

  handleMessageReceived(data) {
    const { messages } = this.state;
    messages.push(data);
    this.setState({ messages });
  }

  renderMessages() {
    return this.state.messages.map((message, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{message.text}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <Pusher channel={this.channelName()}
                event="message-created"
                handler={this.handleMessageReceived.bind(this)}
                params={this.params()} />

        <Row>
          <Col md={6} mdPush={3}>
            <Panel header={`Add messages from user: ${this.state.userId}`} bsStyle="primary">
              <Form onSubmit={this.handleSubmit.bind(this)}>
                <FormGroup controlId="userId">
                  <ControlLabel>User ID: </ControlLabel>
                  <FormControl onChange={this.handleInputChange.bind(this)} placeholder="New message..." />
                </FormGroup>

                <Button type='submit' bsStyle="primary">Create</Button>
              </Form>
            </Panel>
          </Col>
        </Row>

        <Row>
          <Col md={6} mdPush={3}>
            <Panel header="Messages" bsStyle="primary">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Text</th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderMessages()}
                </tbody>
              </Table>
            </Panel>
          </Col>
        </Row>
      </div>
    );
  }
}
