import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { Todo } from "../models/Todo";

const avatarSlice = createSlice({
  name: 'avatar',
  initialState: { avatar: '', age: 20 },
  reducers: {
    setAvatar: (state, action) => {
      state.avatar = action.payload // mutate the state all you want with immer
    },
  },
  
})

export const { setAvatar  } = avatarSlice.actions;
export default avatarSlice.reducer;