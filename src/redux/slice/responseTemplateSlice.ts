import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface responseTemplateState {
  value: any;
}

const initialState: responseTemplateState = {
  value: null,
};

const responseTemplateSlice = createSlice({
  name: 'responseTemplate',
  initialState,
  reducers: {
    setResponseTemplate: (state, action: PayloadAction<any>) => {
      state.value = action.payload;
    },
  },
});

export const { setResponseTemplate } = responseTemplateSlice.actions;

export default responseTemplateSlice.reducer;
