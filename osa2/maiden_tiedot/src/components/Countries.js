import React from 'react'
import Weather from './Weather'

const Countries = ({ countriesToShow, showDetails }) => {
    if (countriesToShow.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else if (countriesToShow.length > 1) {
        return (
            countriesToShow
                .map(country =>
                    <div key={country.name}>
                        {country.name}
                        <button onClick={showDetails(country.name)}>show</button>
                    </div>
                )
        )
    } else if (countriesToShow.length === 1) {
        return (
            <div>
                <h1>{countriesToShow[0].name}</h1>
                <div>capital {countriesToShow[0].capital}</div>
                <div>population {countriesToShow[0].population}</div>
                <h2>languages</h2>
                <ul>
                    {countriesToShow[0].languages.map(language => <li key={language.name}>{language.name}</li>)}
                </ul>
                <img src={countriesToShow[0].flag} width="100" alt="flag" />
                <Weather capital={countriesToShow[0].capital} />
            </div>
        )
    }
    return (
        <div>
            No matches found
        </div>
    )
}

export default Countries