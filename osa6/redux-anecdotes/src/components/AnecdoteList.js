import { useDispatch, useSelector } from "react-redux"
import { voteAnec } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const allAnecdotes = useSelector(state => state.anecdotes)
    const filteredAnecdotes = useSelector(
        state => state.anecdotes.filter(a => a.content.includes(state.filter)))
    const sortedAnecdotes = filteredAnecdotes.sort((a,b) => b.votes - a.votes)

    const vote = (id, content) => {
        dispatch(voteAnec(id, allAnecdotes))
        dispatch(setNotification(`you voted ${content}`, 5))
    }

    return(
        <div>
            {sortedAnecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => 
                        vote(anecdote.id, anecdote.content)}>vote</button>
                </div>
            </div>
            )}
        </div>
    )
}

export default AnecdoteList