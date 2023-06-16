import axios from "axios"

const url = "http://localhost:3001/anecdotes"

const getAnecdotes = async () => {
    const result = await axios.get(url)
    return result.data
}

const addAnecdote = async (anecdote) => {
    await axios.post(url, anecdote)
}

const voteAnecdote = async (updatedAnecdote) => {
    await axios.put(`${url}/${updatedAnecdote.id}`, updatedAnecdote)
}

export default {getAnecdotes, addAnecdote, voteAnecdote}
