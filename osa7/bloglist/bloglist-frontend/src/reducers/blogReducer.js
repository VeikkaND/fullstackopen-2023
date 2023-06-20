import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs"

const blogSlice = createSlice({
    name: "blogs",
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        likeBlog (state, action) {
            const blog = action.payload
            const newBlog = {...blog, likes: blog.likes + 1}
            return state.map(
                b => b.id !== blog.id ? b : newBlog
            )
        }
    }
})

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const {setBlogs, likeBlog} = blogSlice.actions
export default blogSlice.reducer 