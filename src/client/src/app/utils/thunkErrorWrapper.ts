export const thunkErrorWrapper = (method: any, rejectWithValue: any, context = null) => async (...args : any) => {
  try {
    const response = await method.apply(context, args);
    if (response.error) {
      return rejectWithValue(response.error);
    }
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message ?? error.message);
  }
};
