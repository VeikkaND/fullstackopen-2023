import { createSlice } from "@reduxjs/toolkit";

const initialState = null

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        enableNotification(state, action) {
            return action.payload
        },
        deleteNotification(state, action) {
            return null
        }
    }
})

export const setNotification = (message, time) => {
    return async dispatch => {
        dispatch(enableNotification(message))
        setTimeout(() => {
            dispatch(deleteNotification())
        }, time * 1000)
    }
}

export default notificationSlice.reducer
export const {enableNotification, deleteNotification} = notificationSlice.actions