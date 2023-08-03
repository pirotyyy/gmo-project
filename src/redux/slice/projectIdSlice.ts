import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface ProjectIdState {
  value: string;
}
const initialState: ProjectIdState = {
  value: '',
};
const projectIdSlice = createSlice({
  name: 'projectId',
  initialState,
  reducers: {
    setProjectId: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});
export const { setProjectId } = projectIdSlice.actions;
export default projectIdSlice.reducer;