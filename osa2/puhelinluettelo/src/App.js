import { useState, useEffect } from 'react'
import Names from './components/names'
import Filter from './components/filter'
import AddNew from './components/addNew'
import numberService from './components/numbers'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [namesToShow, setNamesToShow] = useState(persons)
  const [notiMessage, setNotiMessage] = useState('')
  const [notiPerson, setNotiPerson] = useState('')
  
  useEffect(() => {
    numberService.getAll()
      .then(numbers => {
        setPersons(numbers)
        setNamesToShow(numbers)
      })
  },[])

  const nameExists = (name, originalName) => {
    if(window.confirm(`${name.name} has already been added to phonebook,
              replace the old number with a new one?`)){
        numberService.update(name, originalName.id)
                .then(numberService.getAll()
                  .then(
                    names => {
                      setPersons(names)
                      setNamesToShow(names)
                      setNotiMessage("Updated")
                      setNotiPerson(name.name)
                      setTimeout(() => {
                        setNotiMessage(null)
                    }, 3000)
                    }
                  ))
      }
  }

  const addName = (event) => {
    event.preventDefault()
    const name = {
      name: newName,
      number: newNumber
    }
    persons.map(name => name.name).includes(newName)
      ? nameExists(name, persons.find(n => n.name == newName))
      : numberService.create(name)
        .then(addedNumber => {
          setPersons(persons.concat(addedNumber))
          setNamesToShow(persons.concat(addedNumber)); {/* add names to filtering */}
          setNotiMessage("Added")
          setNotiPerson(name.name)
          setTimeout(() => {
            setNotiMessage(null)
        }, 3000)
        })
      
      
  }

  const handleFiltering = (event) => {
    setNewFilter(event.target.value.toLowerCase())
    if(event.target.value == "") {
      setNamesToShow(persons)
    } else {
      setNamesToShow(persons.filter(name => name.name.toLowerCase()
                    .match(event.target.value.toLowerCase())))
    }
  }

  const handleNewName = (event) => {setNewName(event.target.value)}
  const handleNewNumber = (event) => {setNewNumber(event.target.value)}
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notiMessage} name={notiPerson}/>
      <Filter newFilter={newFilter} handleFiltering={handleFiltering} />
      <h2>add a new</h2>
      <AddNew addName={addName} newName={newName} handleNewName={handleNewName} 
      newNumber={newNumber} handleNewNumber={handleNewNumber} />
      <h2>Numbers</h2>
      <Names names={namesToShow} numberService={numberService} 
      setPersons={setPersons} setNamesToShow={setNamesToShow} 
      setNotiMessage={setNotiMessage} setNotiPerson={setNotiPerson}/>
    </div>
  )

}

export default App