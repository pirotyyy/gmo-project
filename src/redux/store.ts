// store.ts
import { configureStore } from '@reduxjs/toolkit';
import responseTextReducer from './slice/responseTextSlice';
import responseTemplateReducer from './slice/responseTemplateSlice'
import selectedTemplateReducer from './slice/selectedTemplateSlice'
import projectIdReducer from './slice/projectIdSlice'
import userInfoReducer from './slice/userInfoSlice'
import clientMessageReducer from './slice/clientMessageSlice'

export const store = configureStore({
  reducer: {
    responseText: responseTextReducer,
    responseTemplate: responseTemplateReducer,
    selectedTemplate: selectedTemplateReducer,
    projectId: projectIdReducer,
    userInfo: userInfoReducer,
    clientMessage: clientMessageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
