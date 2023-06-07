import { createAppAsyncThunk } from '../../utils/createAppAsync';
import { AuthFulfilled } from '../../slices/types/Auth/AuthFulfilled';
import { UserDTO } from '../../../services/DTO/UserDTO';
import { AuthStoreError } from '../../slices/types/Auth/AuthState';

export const registerUser = createAppAsyncThunk<AuthFulfilled,
  UserDTO,
  { rejectValue: AuthStoreError }>(
    'account/register',
    async (credentials: UserDTO, thunkAPI) => {
      const thunk = thunkAPI.extra.thunkErrorWrapper(
        thunkAPI.extra.authService.register,
        thunkAPI.rejectWithValue,
        thunkAPI.extra.authService
      );
      return await thunk(credentials);
    }
  );
