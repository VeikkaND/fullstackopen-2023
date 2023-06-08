import { useState, useEffect } from "react";
import CountryManager from "./Components/CountryManager";
import SearchResults from "./Components/Search";
import ShowInfo from "./Components/ShowInfo";
import getWeather from "./Components/Weather";

function App() {
  const [countries, setCountries] = useState([])
  const [countriesName, setCountriesName] = useState([])
  const [newCountry, setNewCountry] = useState("")
  const [matchingCountries, setMatchingCountries] = useState([])
  const [info, setInfo] = useState(null)
  const [weather, setWeather] = useState()

  useEffect(() => {
    CountryManager.getAllCountries()
      .then(response => {
        setCountries(response)
        setCountriesName(response.map(country => country.name.common))
      })
  }, [])
  useEffect(() => {
    if(info) {
      console.log("fetching api...")
      getWeather(info.capital)
      .then(response => {
        setWeather(response)
      })
    }
  }, [info])

  const handleSearch = (event) => {
    event.preventDefault()
    const value = event.target.value.toLowerCase()
    setNewCountry(value)
    setMatchingCountries(countriesName.filter(country => country.
      toLowerCase().includes(value)))
  }

  return (
    <div>
      find countries
      <input onChange={handleSearch}></input>
      <SearchResults countries={matchingCountries} 
      search={newCountry} countriesInfo={countries} 
      setSearch={setNewCountry} setMatchingCountries={setMatchingCountries} 
      setInfo={setInfo}/>
      <ShowInfo info={info} weather={weather} matchingCountries={matchingCountries}/>
    </div>
  );
}

export default App;
