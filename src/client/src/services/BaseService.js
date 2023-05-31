export default class BaseService {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.token = null;
  }

  setToken(token) {
    this.token = token;
  }

  async request(endpoint, method, body = {}) {
    const url = `${this.baseURL}${endpoint}`;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(this.token ? { authorization: this.token } : {})
        },
        body: JSON.stringify(body),
      });

      return await response.json();
    } catch (error) {
      console.error(`Error ${method} ${endpoint}:`, error);
      throw error;
    }
  }
}
