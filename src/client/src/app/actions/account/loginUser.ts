import { createAppAsyncThunk } from '../../utils/createAppAsyncThunk';
import { AuthStoreError } from '../../slices/types/Auth/AuthState';
import { AuthFulfilled } from '../../slices/types/Auth/AuthFulfilled';
import { UserDTO } from '../../../services/DTO/UserDTO';
import { thunkErrorWrapper } from '../../utils/thunkErrorWrapper';

export const loginUser = createAppAsyncThunk<AuthFulfilled,
  UserDTO,
  { rejectValue: AuthStoreError }>(
    'account/login',
    async ({ email, password }: UserDTO, thunkAPI) => {
      const thunk = thunkErrorWrapper(
        thunkAPI.extra.authService.login,
        thunkAPI.rejectWithValue,
        thunkAPI.extra.authService
      );
      return await thunk(email, password);
    }
  );
