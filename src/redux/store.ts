// store.ts
import { configureStore } from '@reduxjs/toolkit';
import responseTextReducer from './slice/responseTextSlice';
import responseTemplateReducer from './slice/responseTemplateSlice'
import selectedTemplateReducer from './slice/selectedTemplateSlice'

export const store = configureStore({
  reducer: {
    responseText: responseTextReducer,
    responseTemplate: responseTemplateReducer,
    selectedTemplate: selectedTemplateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
