import React, { useState, useEffect } from 'react'
import axios from 'axios';

const Weather = ({ capital }) => {
    const [weather, setWeather] = useState('')

    const url = `https://api.apixu.com/v1/current.json?key=366ca1450ace49b58a4202925190706&q=${capital}`

    const hook = () => {
        axios
            .get(url)
            .then(response => {
                setWeather(response.data)
            })
    }

    useEffect(hook, [])

    if (weather !== '') {
        return (
            <div>
                <h2>Weather in {capital}</h2>
                <div>
                    <b>temperature:</b> {weather.current.temp_c} Celsius
            </div>
                <img src={weather.current.condition.icon} alt="weather icon" />
                <div>
                    <b>wind:</b> {weather.current.wind_kph} kph direction {weather.current.wind_dir}
                </div>
            </div>
        )
    }
    return null
}

export default Weather