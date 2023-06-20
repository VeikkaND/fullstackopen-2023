import React from "react";
import "@testing-library/jest-dom/extend-expect"
import {render, screen} from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import Blog from "./Blog";

const blog = {
    title: "Title",
    author: "author",
    url: "url",
    likes: 0,
    user: "userid",
    user_name: "name"
}
const blogs = [blog]
const setBlogs = jest.fn()
const token = "token"

describe("<Blog /> ", () => {
    test("renders title", () => {
        const {container} = render(<Blog blog={blog} blogs={blogs} 
                            setBlogs={setBlogs} token={token}/>)

        const div = container.querySelector(".blogShort")

        expect(div).toHaveTextContent("Title")
    })
    test("renders url, likes, user", () => {
        const {container} = render(<Blog blog={blog} blogs={blogs} 
            setBlogs={setBlogs} token={token}/>)

        const div = container.querySelector(".blogLong")

        expect(div).toHaveTextContent("Title", "name", "url", 0)
    })
})