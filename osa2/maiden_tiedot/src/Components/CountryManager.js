import axios from 'axios'

const allCountriesURL = "https://studies.cs.helsinki.fi/restcountries/api/all"

const getAllCountries = () => {
    const promise = axios.get(allCountriesURL)
    return promise.then(response => response.data)
}

export default {
    getAllCountries
}