import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedTemplateState {
  value: any;
}

const initialState: SelectedTemplateState = {
  value: null,
};

const SelectedTemplateState = createSlice({
  name: 'selectedTemplate',
  initialState,
  reducers: {
    setSelectedTemplate: (state, action: PayloadAction<any>) => {
      state.value = action.payload;
    },
  },
});

export const { setSelectedTemplate } = SelectedTemplateState.actions;

export default SelectedTemplateState.reducer;
