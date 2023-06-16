import { useDispatch } from "react-redux"
import { appendAnecdotes } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createNew = (event) => {
        event.preventDefault()
        dispatch(appendAnecdotes(event.target.content.value))
        dispatch(setNotification(`you added ${event.target.content.value}`, 5))
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={createNew}>
                <div><input name='content'/></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm