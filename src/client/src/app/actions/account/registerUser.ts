import { createAppAsyncThunk } from '../../utils/createAppAsyncThunk';
import { AuthFulfilled } from '../../slices/types/Auth/AuthFulfilled';
import { UserDTO } from '../../../services/DTO/UserDTO';
import { AuthStoreError } from '../../slices/types/Auth/AuthState';

export const registerUser = createAppAsyncThunk<AuthFulfilled,
  UserDTO,
  { rejectValue: AuthStoreError }>(
    'account/register',
    async ({ username, password }, thunkAPI) => {
      const thunk = thunkAPI.extra.thunkErrorWrapper(
        thunkAPI.extra.authService.register,
        thunkAPI.rejectWithValue,
        thunkAPI.extra.authService
      );
      return await thunk(username, password);
    }
  );
