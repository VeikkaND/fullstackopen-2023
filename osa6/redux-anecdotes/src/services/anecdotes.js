import axios from "axios"

const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createAnecdote = async (anecdote) => {
    const response = await axios.post(baseUrl, anecdote)
    return response.data
}

const voteAnecdote = async (anecdoteId) => {
    const res = await axios.get(`${baseUrl}/${anecdoteId}`)
    const anecdote = res.data
    const updatedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    const response = await axios
        .put(`${baseUrl}/${anecdoteId}`, updatedAnecdote)
    return response
}

export default {getAll, createAnecdote, voteAnecdote}