import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching properties
export const fetchProperties = createAsyncThunk(
  'properties/fetchProperties',
  async (_, { rejectWithValue }) => {
    try {
      const url = "http://localhost:8080/properties";
      const response = await fetch(url);
      const result = await response.json();
    //   console.log(result.properties)
      return result.properties;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Something went wrong');
    }
  }
);

const propertiesSlice = createSlice({
  name: 'properties',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {}, // Add any synchronous reducers if needed
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default propertiesSlice.reducer;
