export const thunkErrorWrapper = (method, rejectWithValue, context = null) => async (...args) => {
  try {
    const response = await method.apply(context, args);
    if (response.error) {
      return rejectWithValue(response.error);
    }
    return response;
  } catch (error) {
    return rejectWithValue(error.response.data.message ?? error.message);
  }
};
