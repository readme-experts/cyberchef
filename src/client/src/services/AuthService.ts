import BaseService from './BaseService';
import AuthError from './errors/AuthError';

export default class AuthService extends BaseService {
  constructor(baseURL) {
    super(baseURL);
  }

  async register(userData) {
    try {
      return await this.request('/register', 'POST', userData);
    } catch (error) {
      throw new AuthError('Error registering: ' + error.message);
    }
  }

  async login(credentials) {
    try {
      const response = await this.request('/login', 'POST', credentials);
      if (response.token) {
        this.setToken(response.token);
      }
      return response;
    } catch (error) {
      throw new AuthError('Error logging in: ' + error.message);
    }
  }

  async logout() {
    this.setToken(null);
  }
}
