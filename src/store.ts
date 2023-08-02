// store.ts
import { configureStore } from '@reduxjs/toolkit';
import responseTextReducer from './responseTextSlice';

export const store = configureStore({
  reducer: {
    responseText: responseTextReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;