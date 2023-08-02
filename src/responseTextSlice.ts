// responseTextSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ResponseTextState {
  value: string;
}

const initialState: ResponseTextState = {
  value: '',
};

const responseTextSlice = createSlice({
  name: 'responseText',
  initialState,
  reducers: {
    setResponseText: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setResponseText } = responseTextSlice.actions;

export default responseTextSlice.reducer;
