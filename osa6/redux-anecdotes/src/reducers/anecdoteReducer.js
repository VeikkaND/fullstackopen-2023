import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const anecdotesAtStart = []

const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name:"anecdotes",
  initialState,
  reducers: {
    voteAnecdote(state, action) {
      const anecdote = action.payload.allAnecdotes
        .find(a => a.id === action.payload.id)
      const updatedAnecdote = {...anecdote, votes: anecdote.votes + 1}
      const updateIndex = action.payload.allAnecdotes
        .findIndex(a => a === anecdote)
      state[updateIndex] = updatedAnecdote
    },
    createAnecdote(state, action) {
      const newAnecdotes = state.concat(action.payload)
      return newAnecdotes
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const appendAnecdotes = (content) => {
  return async dispatch => {
    const anecdoteAsObject = asObject(content)
    const newAnecdote = await anecdoteService.createAnecdote(anecdoteAsObject)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const voteAnec = (id, allAnecdotes) => {
  return async dispatch => {
    await anecdoteService.voteAnecdote(id)
    dispatch(voteAnecdote({id, allAnecdotes}))
  }
}

export default anecdoteSlice.reducer
export const {voteAnecdote, createAnecdote, setAnecdotes} = anecdoteSlice.actions