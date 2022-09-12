import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Global from "../Global";
import axios from "axios";

export const createUser = createAsyncThunk(
  "user/createUser",

  async (data, thunkAPI) => {
    console.log(data);
    try {
      const response = await axios.post(Global.baseUrl + "user/create", {
        ...data,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const editUser = createAsyncThunk(
  "user/editUser",

  async (data, thunkAPI) => {
    console.log(data)
    try {
      const response = await axios.patch(Global.baseUrl + "user/edit", {
        ...data,
      });

      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",

  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(Global.baseUrl + `user/delete/${id}`);

      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const readUser = createAsyncThunk(
  "user/readUser",

  async (id, thunkAPI) => {
    try {
      const response = await axios.get(Global.baseUrl + `user/read/${id}`);

      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const readAllUser = createAsyncThunk(
  "user/allUser",

  async (id, thunkAPI) => {
    try {
      const response = await axios.get(Global.baseUrl + `user/getAll`);

      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    message: null,
    isLoading: false,
    user: [],
    warning: false
  },

  reducers: {
    clearState: (state) => {
      state.warning = false;
      state.message = null;
    },
  },
  extraReducers: {
    [createUser.fulfilled]: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
    },
    [createUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
      state.warning= true
    },
    [createUser.pending]: (state) => {
      state.isLoading = true;
      state.message = null;
    },

    [editUser.fulfilled]: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
    },
    [editUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    },
    [editUser.pending]: (state) => {
      state.isLoading = true;
      state.message = null;
    },

    [deleteUser.fulfilled]: (state, action) => {
      state.message = action.payload;
      state.isLoading = false;
    },
    [deleteUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    },
    [deleteUser.pending]: (state) => {
      state.isLoading = true;
      state.message = null;
    },
    [readUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    [readUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    },
    [readUser.pending]: (state) => {
      state.isLoading = true;
      state.user = [];
    },
    [readAllUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    [readAllUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    },
    [readAllUser.pending]: (state) => {
      state.isLoading = true;
      state.user = [];
    },
  },
});

const { reducer, actions } = userSlice;
export const { clearState } = actions;
export default reducer;
