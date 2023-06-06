import { useState } from 'react'

const Header = (props) => {
  return (
    <h1>{props.header}</h1>
  )
}

const Display = ({text, amount}) => {
  return (
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{amount}</td>
      </tr>
    </tbody>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <Display text={text} amount={value} />
  )
}

const Statistics = ({good, neutral, bad}) => {
  const total = good+neutral+bad
  const totalValue = good*1+bad*-1

  if(total <= 0) {
    return(
      <p>No feedback given</p>
    )
  }

  return(
    <div>
      <table>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={totalValue/total} />

        <StatisticLine text="positive" value={new Intl.NumberFormat(
        "default",{style:"percent", minimumFractionDigits:2})
        .format(good/total)} />
      </table>
    </div>
  )
}

const Button = ({handleClick, text}) => {
  return(
    <button onClick={handleClick}>{text}</button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header header="give feedback"/>
      <Button handleClick={() => setGood(good+1)} text="good"/>
      <Button handleClick={() => setNeutral(neutral+1)} text="neutral"/>
      <Button handleClick={() => setBad(bad+1)} text="bad"/>
      <Header header="statistics"/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App