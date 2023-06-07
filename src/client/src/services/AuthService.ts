import BaseService from './BaseService';
import AuthError from './errors/AuthError';
import { UserDTO } from './DTO/UserDTO';
import { AuthFulfilled } from '../app/slices/types/Auth/AuthFulfilled';

export default class AuthService extends BaseService {
  constructor(baseURL: string) {
    super(baseURL);
  }

  async register(userData: UserDTO): Promise<AuthFulfilled> {
    try {
      return await this.request('/register', 'POST', userData);
    } catch (error) {
      throw new AuthError('Error registering: ' + (error as Error).message);
    }
  }

  async login(username: string, password: string): Promise<AuthFulfilled> {
    try {
      const response = await this.request('/login', 'POST', { username, password });
      if (response.token) {
        this.setToken(response.token);
      }
      return response;
    } catch (error) {
      throw new AuthError('Error logging in: ' + (error as Error).message);
    }
  }
}
