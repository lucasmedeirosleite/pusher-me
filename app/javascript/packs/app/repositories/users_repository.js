import APIClient from '../../lib/api_client';

export default class UsersRepository {
  constructor(client = new APIClient()) {
    this.client = client;
  }

  create(user) {
    return this.client.post('users', user);
  }
}
