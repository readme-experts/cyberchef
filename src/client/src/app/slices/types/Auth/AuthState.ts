import { User } from '../../../../services/models/User';
import { RecipeModel } from '../../../../services/models/RecipeModel';

export type AuthError =  Error | undefined | null;
export interface AuthState {
  user: User | null,
  token: string | null,
  userRecipes: RecipeModel[],
  loading: boolean,
  error: AuthError
}
