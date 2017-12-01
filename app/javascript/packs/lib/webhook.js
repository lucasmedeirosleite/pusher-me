import APIClient from './api_client';

export default class Webhook {
  constructor(client = new APIClient()) {
    this.client = client;
  }

  subscribe(data) {
    return this.client.post('pusher/subscribe', data);
  }

  unsubscribe(channel, socket_id) {
    const params = { channel, socket_id };
    return this.client.delete('pusher/unsubscribe', params);
  }
}
