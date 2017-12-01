import React, { Component } from 'react';
import * as PusherLib from 'pusher-js';
import Webhook from '../../../lib/webhook';

const API_KEY = process.env.PUSHER_APP_KEY;
const CLUSTER = process.env.PUSHER_CLUSTER;
const ENCRYPTED = Boolean(process.env.ENCRYPTED);
const AUTH_URL = process.env.PUSHER_AUTH_URL;

export default class Pusher extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pusher: null,
      socket: null,
      webhook: new Webhook()
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

    socket.bind('pusher:subscription_succeeded', () => {
      const data = this.deviceData();

      this.state.webhook.subscribe(data).then((response) => {
        console.log('Successfully subscribed');
      }).catch((data) => {
        console.log('Unable to subscribe to channel');
      });
    });

    this.setState({
      pusher: pusher,
      socket: socket
    });
  }

  componentWillUnmount() {
    const { webhook, pusher } = this.state;

    webhook.unsubscribe(this.props.channel, pusher.connection.socket_id).then(() => {
      this.state.socket.unbind(this.props.event);
      this.state.socket.unsubscribe(this.props.channel);
      this.state.socket.disconnect();
      console.log('Successfully unsubscribed');
    }).catch((data) => {
      console.log('Unable to unsubscribe channel');
    });
  }

  deviceData() {
    return {
      channel: {
        name: this.props.channel,
        user_id: this.props.params.userId,
        device: {
          socket_id: this.state.pusher.connection.socket_id,
          platform: 'Web'
        }
      }
    };
  }

  render() {
    return <div />;
  }
}
