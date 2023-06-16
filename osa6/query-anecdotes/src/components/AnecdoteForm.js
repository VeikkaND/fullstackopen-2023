import requests from "../requests"
import { useMutation, useQueryClient } from "react-query"
import NotificationContext from "../NotificationContext"
import { useContext } from "react"

const AnecdoteForm = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(requests.addAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes")
    },
    onError: () => {
      notificationDispatch({type: "SET",
      payload: `too short anecdote, must have length 5 or more`
      })
      setTimeout(() => {
        notificationDispatch({type: "RESET"})
      }, 3000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = {
      content: content,
      id: Math.floor(Math.random() * 100000),
      votes: 0
    }
    newAnecdoteMutation.mutate(newAnecdote)
    notificationDispatch({type: "SET",
    payload: `anecdote '${content}' added`
    })
    setTimeout(() => {
        notificationDispatch({type: "RESET"})
    }, 3000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
