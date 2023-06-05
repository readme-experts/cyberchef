import { User } from '../../../services/models/User';
import { Recipe } from '../../../services/models/Recipe';

export interface AuthState {
  user: User | null,
  token: string | null,
  userRecipes: Recipe[],
  loading: boolean,
  error: string | null
}
