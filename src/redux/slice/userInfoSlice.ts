import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserInfoState {
  value: any;
}

const initialState: UserInfoState = {
  value: '',
};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<any>) => {
      state.value = action.payload;
    },
  },
});

export const { setUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
