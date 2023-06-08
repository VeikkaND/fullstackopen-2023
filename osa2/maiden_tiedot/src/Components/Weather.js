import axios from "axios"

const api_key = process.env.REACT_APP_KEY

const getWeather = (city) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`
    const promise = axios.get(url)
    return(promise.then(result => result.data))
}

export default getWeather