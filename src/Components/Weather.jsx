import React, { useEffect, useRef, useState } from "react";
import './weather.css'
import search from '../assets/search.png'
import clear from '../assets/clear.png'
import cloud from '../assets/cloud.png'
import drizzle from '../assets/drizzle.png'
import humidity from '../assets/humidity.png'
import rain from '../assets/rain.png'
import snow from '../assets/snow.png'
import wind from '../assets/wind.png'





const Weather = () => {

    const inputRef = useRef();

    const [weatherData, setWeatherData] = useState(false);

    const allIcons = {
        "01d": clear,
        "01n": clear,
        "02d": cloud,
        "02n": cloud,
        "03d": cloud,
        "03n": cloud,
        "04d": drizzle,
        "04n": drizzle,
        "09d": rain,
        "09n": rain,
        "10d": rain,
        "10n": rain,
        "13d": snow,
        "13n": snow,
    }

    const getWeather = async (city) => {

        if(city === "") {
            alert("Coaie ej prost? Pune un oras");
            return;
        }
        try {

            const apiKey = import.meta.env.VITE_APP_ID;
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok) {
                alert(data.message);
                return;
            }

            const icon = allIcons[data.weather[0].icon] || clear;
            console.log(data);
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,
                feels_like: Math.floor(data.main.feels_like)
            })
        } catch (error) {
            setWeatherData(false);
            console.error("Ai belit pla")
        }
    }

    useEffect(() => {
        getWeather("London");
    },[])


  return (

    
    


    <div className="weather">
        <div className="search-box">
            <input ref={inputRef} type="text" placeholder="Search"/>
            <img src={search} alt="" onClick={() => getWeather(inputRef.current.value)}/>
        </div>
        {weatherData ? <>
            <img src={weatherData.icon} alt="" className="weather-icon"/>
        <p className="temperature">{weatherData.temperature}°C</p>
        <p className="location">{weatherData.location}</p>
        <p className="feels">Feels Like: {weatherData.feels_like}°C</p>
        <div className="weather-data">
            <div className="col">
                <img src={humidity} alt="" />
                <div>
                    <p>{weatherData.humidity} %</p>
                    <span>Humidity</span>
                </div>
            </div>
            <div className="col">
                <img src={wind} alt="" />
                <div>
                    <p>{weatherData.windSpeed} Km/h</p>
                    <span>Wind Speed</span>
                </div>
            </div>
        </div>
        </> : <></>}
        
    </div>
  );
}

export default Weather;