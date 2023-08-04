import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface ClientMessageState {
  value: string;
}
const initialState: ClientMessageState = {
  value: '',
};
const clientMessageSlice = createSlice({
  name: 'clientMessage',
  initialState,
  reducers: {
    setClientMessage: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});
export const { setClientMessage } = clientMessageSlice.actions;
export default clientMessageSlice.reducer;