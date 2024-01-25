import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { Todo } from "../models/Todo";
type UserStateType = {
    user: ProfileObj | null,
}
const initialState: UserStateType = {
    user: {
        username: `anonymous`,
        location:`string`,
        website:`string`,
        company: `string`,
        phone: `string`,
        birthday: `string`,
        avatar:`string`,
    }
}

const userSlice = createSlice({
  name: 'user',
  initialState ,
  reducers: {
    setUser: (state, action) => {
        // console.log(action.payload);
      state.user = action.payload // mutate the state all you want with immer
    },
  },
  
})

export const { setUser  } = userSlice.actions;
export default userSlice.reducer;