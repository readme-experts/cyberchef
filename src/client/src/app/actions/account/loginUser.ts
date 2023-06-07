import { createAppAsyncThunk } from '../../utils/createAppAsync';
import { AuthStoreError } from '../../slices/types/Auth/AuthState';
import { AuthFulfilled } from '../../slices/types/Auth/AuthFulfilled';
import { UserDTO } from '../../../services/DTO/UserDTO';

export const loginUser = createAppAsyncThunk<AuthFulfilled,
  UserDTO,
  { rejectValue: AuthStoreError }>(
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
