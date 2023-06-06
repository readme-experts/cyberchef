
import { createAppAsyncThunk } from '../../store';
import { AuthError } from '../../slices/types/Auth/AuthState';
import { AuthFulfilled } from '../../slices/types/Auth/AuthFulfilled';
import { UserDTO } from '../../../services/DTO/UserDTO';

export const loginUser = createAppAsyncThunk<AuthFulfilled,
  UserDTO,
  { rejectValue: AuthError }>(
    'account/login',
    async (credentials: UserDTO, thunkAPI) => {
      const thunk = thunkAPI.extra.thunkErrorWrapper(
        thunkAPI.extra.authService.login,
        thunkAPI.rejectWithValue,
        thunkAPI.extra.authService
      );
      return await thunk(credentials);
    }
  );
