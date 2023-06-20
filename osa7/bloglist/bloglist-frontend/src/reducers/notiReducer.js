import { createSlice } from "@reduxjs/toolkit";

const notiSlice = createSlice({
    name: "notification",
    initialState: "",
    reducers: {
        setNotification(state, action) {
            return action.payload
        }
    }
})

export const { setNotification } = notiSlice.actions
export default notiSlice.reducer