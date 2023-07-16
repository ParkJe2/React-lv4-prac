import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  error: null,
};

export const __getDiaries = createAsyncThunk("diary/getDiaries", async (payload, thunkAPI) => {
  try {
    const response = await axios.get("http://localhost:4000/diary");
    // response.data
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __addDiary = createAsyncThunk("diary/addDiary", async (payload, thunkAPI) => {
  try {
    // axios 통신
    await axios.post("http://localhost:4000/diary", payload);
    return thunkAPI.fulfillWithValue(payload);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// export const __updateDiary = createAsyncThunk("diary/addDiary", async (payload, thunkAPI) => {
//   try {
//     // axios 통신
//     await axios.patch("http://localhost:4000/diary", payload);
//     return thunkAPI.fulfillWithValue(payload);
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error);
//   }
// });

// export const __deleteDiary = createAsyncThunk("diary/addDiary", async (payload, thunkAPI) => {
//   try {
//     // axios 통신
//     await axios.delete("http://localhost:4000/diary", payload);
//     return thunkAPI.fulfillWithValue(payload);
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error);
//   }
// });

const diarySlice = createSlice({
  name: "diary",
  initialState,
  reducers: {},
  extraReducers: {
    [__getDiaries.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;
    },
    [__getDiaries.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    [__getDiaries.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
    },

    [__addDiary.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = [...state.data, action.payload];
    },
    [__addDiary.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    [__addDiary.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
  },
});

export const {} = diarySlice.actions;
export default diarySlice.reducer;
