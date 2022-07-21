import React, { useState } from 'react';
const api = {
  key: '0edbe46d826a01958b4ef44e428fa6a9',
  base: 'https://api.openweathermap.org/data/2.5/'
}

function App() {
  const [query, setQuerty] = useState('')
  const [weather, setWeather] = useState('')

  console.log(weather)
  const search = (event) => {
    if( event.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setQuerty('')
          setWeather(result);
        })
    }
  }

  const dataBuilder = (d) => {
    let months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
    let days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main !== 'undefined') ? ((weather.main.temp > 16) ? 'App warm' : 'App') : 'App'}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Поиск..."
            onChange={e => setQuerty(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main !== 'undefined') ? (
          <>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dataBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°С
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </>
        ) : ('')}
        {(weather.cod >= 400) && 
          <>
          <div className="location-box">
            <div className="weather-box">
              <div className="weather">Город не найден...</div>
            </div>
          </div>
          </>
        }

      </main>
    </div>
  );
}

export default App;
