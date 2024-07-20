import { useEffect, useRef, useState } from "react";

import "./Weather.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import drizzle_icon from "../assets/drizzle.png";
import cloud_icon from "../assets/cloud.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import humidity_icon from "../assets/humidity.png";

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

  const allIcon = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09n": rain_icon,
    "09d": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13n": snow_icon,
    "13d": snow_icon,
  };

  const key = import.meta.env.VITE_APP_ID;
  const search = async (city) => {
    if (city == "") {
      alert("Enter a valid city name to check the weather");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;

      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
        return;
      }
      console.log(data);
      const icon = allIcon[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.error("error in fetching data, does such city even exists");
    }
  };

  useEffect(() => {
    search("London");
  }, []);

  return (
    <div className="weather">
      <div className="search-box">
        <input type="text" ref={inputRef} placeholder="Type city name" />
        <img
          src={search_icon}
          alt=""
          onClick={() => search(inputRef.current.value)}
        />
      </div>
      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="" className="weather-icon" />
          <p className="temperature">{weatherData.temperature}°C</p>
          <p className="city">{weatherData.location}</p>
          <div className="weather-data">
            <div className="column">
              <img src={humidity_icon} alt="" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>humidity</span>
              </div>
            </div>
            <div className="column">
              <img src={wind_icon} alt="" />
              <div>
                <p>{weatherData.windspeed} km/h</p>
                <span>wind speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;
