import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todoSlice";
import avatarReducer from "./avatarSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    todosReducer,
    avatarReducer,
    userReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;