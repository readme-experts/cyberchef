import BaseService from '../../services/BaseService';

export function thunkErrorWrapper<ReturnType, Args>(method: (...args : Args[]) => ReturnType,
  rejectWithValue: (error: string) => void,
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
