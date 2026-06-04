import axios from "axios";
import { useEffect, useState } from "react";

const Filter = ({ filter, handleFilter }) => {
  return (
    <div>
      find countries
      <input value={filter} onChange={handleFilter} />
    </div>
  );
};

const Countries = ({ countries, handleShow }) => {
  return (
    <div>
      {countries.length > 10 ? (
        <p>too many matches, specify another filter</p>
      ) : (
        <ul>
          {countries.map((c) => (
            <li key={c.name.common}>
              {c.name.common} 
              <button onClick={()=>handleShow(c.name.common)}>show</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null);

  useEffect(()=>{
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${capital}`
    axios
      .get(url)
      .then(res => setWeather(res.data))
      .catch(err => console.log(err))
  }, []);

  if(!weather) return null;

  return (
    <div>
      <h2>weather in {capital}</h2>
      <p>temperature {weather.current.temp_c} celcius</p>
      <img src={weather.current.condition.icon} alt={weather.current.condition.text} width={128}/>
      <p>wind {weather.current.wind_mph} m/s</p>
    </div>
  )
}

const Country = ({ country }) => {

  const getLanguagesList = (languages) => {
    const list = [];
    for (const [key, value] of Object.entries(languages)) {
      list.push(value);
    }
    return list;
  };

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h1>languages</h1>
      {getLanguagesList(country.languages).map(lang => 
        <li key={lang}>{lang}</li>
      )}
      <img src={country.flags.svg} alt={country.flags.alt} width={256}/>
      <Weather capital={country.capital}/>
    </div>
  );
};

const App = () => {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState(null);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((res) => setCountries(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleFilter = (e) => {
    const countryToFilter = e.target.value;
    setFilter(countryToFilter);
  };

  const handleShow = country => {
    setFilter(country);
  };

  if (!countries) return null;

  const countriesToShow = countries.filter((c) =>
    c.name.common.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div>
      <Filter filter={filter} handleFilter={handleFilter} />
      {countriesToShow.length == 1 ? (
        <Country country={countriesToShow[0]} />
      ) : (
        <Countries countries={countriesToShow} handleShow={handleShow} />
      )}
    </div>
  );
};

export default App;
