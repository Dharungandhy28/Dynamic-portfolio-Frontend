import { createSlice } from "@reduxjs/toolkit";

const rootSlice = createSlice({
  name: "root",
  initialState: {
    loading: false,
    portfolioData: null,
    reloadData: false,
    isLogin: false,
    Authtoken: null,
  },
  reducers: {
    Login: (state, action) => {
      state.isLogin = true;
      state.Authtoken = action.payload.token;
      state.portfolioData = action.payload.user;
      action.payload.callback();
    },
    Logout: (state, action) => {
      state.isLogin = false;
      state.Authtoken = null;
    },
    ShowLoading: (state, action) => {
      state.loading = true;
    },
    HideLoading: (state, action) => {
      state.loading = false;
    },
    SetportfolioData: (state, action) => {
      state.portfolioData = { ...action.payload };
    },
    ReloadData: (state, action) => {
      state.reloadData = action.payload;
    },
    UpdateData: (state, action) => {
      const { property, data } = action.payload;
      const isArray = Array.isArray(state.portfolioData[property]);
      if (isArray) {
        const getitem = state.portfolioData[property].findIndex(
          (item) => item._id === data._id
        );
        if (getitem > -1) state.portfolioData[property][getitem] = data;
        else {
          state.portfolioData[property].push(data);
        }
      } else state.portfolioData[property] = data;
    },
    DeleteData: (state, action) => {
      const { property, id } = action.payload;

      state.portfolioData[property] = state.portfolioData[property].filter(
        (item) => {
          return item._id !== id;
        }
      );
    },
  },
});

export default rootSlice.reducer;
export const {
  ShowLoading,
  HideLoading,
  SetportfolioData,
  ReloadData,
  Login,
  Logout,
  UpdateData,
  DeleteData,
} = rootSlice.actions;
