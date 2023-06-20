import { configureStore } from "@reduxjs/toolkit"
import notiReducer from "../reducers/notiReducer"
import blogReducer from "../reducers/blogReducer"
import userReducer from "../reducers/userReducer"
import tokenReducer from "../reducers/tokenReducer"
import usersReducer from "../reducers/usersReducer"

const store = configureStore({
    reducer: {
        notification: notiReducer,
        blogs: blogReducer,
        user: userReducer,
        token: tokenReducer,
        users: usersReducer
    }
})

export default store