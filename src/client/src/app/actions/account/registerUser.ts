import { createAppAsyncThunk } from '../../utils/createAppAsyncThunk';
import { AuthFulfilled } from '../../slices/types/Auth/AuthFulfilled';
import { UserDTO } from '../../../services/DTO/UserDTO';
import { AuthStoreError } from '../../slices/types/Auth/AuthState';
import { thunkErrorWrapper } from '../../utils/thunkErrorWrapper';

export const registerUser = createAppAsyncThunk<AuthFulfilled,
  UserDTO,
  { rejectValue: AuthStoreError }>(
    'account/register',
    async (dto: UserDTO, thunkAPI) => {
      const thunk = thunkErrorWrapper(
        thunkAPI.extra.authService.register,
        thunkAPI.rejectWithValue,
        thunkAPI.extra.authService
      );
      return await thunk(dto);
    }
  );
