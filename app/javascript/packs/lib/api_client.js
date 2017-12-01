import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

export default class APIClient {
  constructor(httpClient = axios, baseUrl = BASE_URL) {
    this.httpClient = httpClient;
    this.baseUrl = baseUrl;
  }

  post(resource, params = {}) {
    const url = `${BASE_URL}/${resource}`;
    return this.httpClient.post(url, params);
  }

  delete(resource, params = {}) {
    const url = `${BASE_URL}/${resource}`;
    return this.httpClient.delete(url, { params });
  }
}
