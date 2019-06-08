import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Countries from './components/Countries'

const App = () => {
  const [countryFilter, setCountryFilter] = useState('')
  const [countries, setCountries] = useState([])

  const countriesToShow = countries
    .filter(country =>
      country.name.toLowerCase().includes(countryFilter.toLowerCase()))

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })

  }

  useEffect(hook, [])

  const handleFilterChange = (event) => {
    setCountryFilter(event.target.value)
  }

  const showDetails = (country) => {
    return () => {
      setCountryFilter(country)
    }
  }

  return (
    <div>
      <form>
        find countries
        <input value={countryFilter} onChange={handleFilterChange} />
      </form>
      <Countries countriesToShow={countriesToShow} showDetails={showDetails} />
    </div>
  )
}

export default App;
