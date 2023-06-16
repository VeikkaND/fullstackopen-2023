import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import requests from './requests'
import { useReducer } from "react"
import NotificationContext from './NotificationContext'

const notificationReducer = (state, action) => {
  switch(action.type) {
      case "SET":
          return action.payload
      case "RESET":
          return null
      default: 
          return state
  }
}

const App = () => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer, null)

  const queryClient = useQueryClient()

  const updatedAnecdoteMutation = useMutation(requests.voteAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes")
    }
  })

  const handleVote = (anecdote) => {
    notificationDispatch({
      type: "SET", 
      payload: `anecdote '${anecdote.content}' voted`
    })
    setTimeout(() => {
      notificationDispatch({type: "RESET"})
    }, 3000)
    updatedAnecdoteMutation.mutate({
      ...anecdote, votes: anecdote.votes + 1
    })
  }

  const result = useQuery("anecdotes",
    () => requests.getAnecdotes(),
    {retry: 1}
  )

  if(result.isError) {
    return (
      <div>anecdote service not available due to problems in server</div>
    )
  }

  if(result.isLoading) {
    return (
      <div>Loading anecdotes...</div>
    )
  }

  const anecdotes = result.data

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      <div>
        <h3>Anecdote app</h3>
      
        <Notification />
        <AnecdoteForm />
      
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
      </div>
    </NotificationContext.Provider>
  )
}

export default App
