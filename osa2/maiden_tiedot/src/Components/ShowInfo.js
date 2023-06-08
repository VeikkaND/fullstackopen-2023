

const ShowInfo = ({info, weather, matchingCountries}) => {
    if(info && weather && matchingCountries.length == 1) {
        return(
            <div>
                <h1>{info.name.common}</h1>
                <p>capital: {info.capital}</p>
                <p>area: {info.area}</p>
                <h3>languages:</h3>
                {Object.values(info.languages).map(i => <li key={i}>{i}</li>)}
                <br/>
                <img src={info.flags.png} alt={info.flags.alt}/>
                <h2>Weather in {info.capital}</h2>
                <p>temperature {Math.round(weather.main.temp - 273.15)} Celcius</p>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather.description}/>
                <p>wind {weather.wind.speed} m/s</p>
            </div>
        )
    }
}
export default ShowInfo