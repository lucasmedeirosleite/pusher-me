import React, { Component } from 'react';
import * as PusherLib from 'pusher-js';

const API_KEY = process.env.PUSHER_APP_KEY;
const CLUSTER = process.env.PUSHER_CLUSTER;
const ENCRYPTED = Boolean(process.env.ENCRYPTED);
const AUTH_URL = process.env.PUSHER_AUTH_URL;

export default class Pusher extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pusher: null,
      socket: null
    };
  }

  componentDidMount() {
    const { userId, token } = this.props.params;

    const pusher = new PusherLib(API_KEY, {
      cluster: CLUSTER,
      encrypted: ENCRYPTED,
      authEndpoint: AUTH_URL,
      auth: {
        params: { user_id: userId },
        headers: { Authorization: `Token token=${token}` }
      }
    });

    const socket = pusher.subscribe(this.props.channel);

    socket.bind(this.props.event, (data) => {
      this.props.handler(data);
    });

    this.setState({
      pusher: pusher,
      socket: socket
    });
  }

  componentWillUnmount() {
    const { webhook, pusher } = this.state;

    this.state.socket.unbind(this.props.event);
    this.state.socket.unsubscribe(this.props.channel);
    this.state.socket.disconnect();
  }

  render() {
    return false;
  }
}
