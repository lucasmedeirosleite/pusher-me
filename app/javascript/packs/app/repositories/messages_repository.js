import APIClient from '../../lib/api_client';

export default class MessagesRepository {
  constructor(client = new APIClient()) {
    this.client = client;
  }

  create(channel, message) {
    const params = { channel, message }
    return this.client.post('messages', params);
  }
}
