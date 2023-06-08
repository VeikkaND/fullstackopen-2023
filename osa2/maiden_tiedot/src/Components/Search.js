import ShowButton from "./ShowButton"

const SearchResults = ({countries, search, countriesInfo, 
    setSearch, setMatchingCountries, setInfo}) => {
    if(search != "") {
        if(countries.length > 10) {
            return <p>Too many matches, specify another filter</p>
        } else if (countries.length <= 10 && countries.length > 1) {
            return(
                countries.map(country =><p key={country}>{country}
                <ShowButton country={country} setSearch={setSearch} 
                setMatchingCountries={setMatchingCountries}/></p>)
            )
        } else if (countries.length == 1){
            const info = countriesInfo.find(
                country => country.name.common == countries[0])
            setInfo(info)
            /* render results here */
        } else {
            return null
        }
    }
}

export default SearchResults