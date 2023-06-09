import { User } from '../../../../services/models/User';

export interface AuthFulfilled {
  user: User,
  accessToken: string,
}
