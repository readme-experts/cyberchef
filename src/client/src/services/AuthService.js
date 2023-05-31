import BaseService from './BaseService';

export default class AuthService extends BaseService {
  constructor(baseURL) {
    super(baseURL);
  }

  async register(userData) {
    try {
      return await this.request('/register', 'POST', userData);
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
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
      console.error('Error logging in:', error);
      throw error;
    }
  }

  async logout() {
    this.setToken(null);
  }
}
