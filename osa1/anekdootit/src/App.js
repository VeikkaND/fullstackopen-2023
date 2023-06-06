import { useState } from 'react'

const Display = (props) => <p>has {props.amount} votes</p>

const MostVotes = (props) => {
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdote}</p>
      <Display amount={props.points}/>
    </div>
  )
}

const App = () => {
  
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const randomNumber = (max) => {
    return Math.floor(Math.random()*(max))
  }

  const updatePoints = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  const maxVotes = () => {
    return points.indexOf(Math.max(...points))
  }

  return (
    <div>
      {anecdotes[selected]}
      <Display amount={points[selected]}/>
      <button onClick={() => updatePoints()}>vote</button>
      <button onClick={() => setSelected(randomNumber(anecdotes.length))}>
        next anecdote
      </button>
      <MostVotes anecdote={anecdotes[maxVotes()]} points={points[maxVotes()]}/>
    </div>
  )
}

export default App