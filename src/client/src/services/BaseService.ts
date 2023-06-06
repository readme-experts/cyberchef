import { useDispatch } from 'react-redux';
import { logout as storeLogout } from '../app/slices/accountSlice';

export default class BaseService {
  public token: string | null;
  private readonly baseURL: string;
  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.token = null;
  }

  setToken(token: string | null) {
    this.token = token;
  }

  async request(endpoint: string, method: string, body = {}) {
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
  logout() {
    const dispatch = useDispatch();
    this.setToken(null);
    dispatch(storeLogout());
  }
}
