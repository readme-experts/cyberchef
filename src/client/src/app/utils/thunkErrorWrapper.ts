import BaseService from '../../services/BaseService';
/* eslint-disable  @typescript-eslint/no-explicit-any */
export function thunkErrorWrapper<ReturnType, Args>(method: (...args : Args[]) => ReturnType,
  rejectWithValue: (value: Error) => any,
  context: BaseService | null = null) {
  return async (...args : Args[]) => {
    try {
      const response = await method.apply(context, args);
      if ((response as any).error) {
        return rejectWithValue((response as any).error);
      }
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message ?? error.message);
    }
  };
}
