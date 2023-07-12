import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LocationInput = ({ onLocationChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue) {
        axios.get(`https://rickandmortyapi.com/api/location/?name=${inputValue}`)
          .then(response => setSuggestions(response.data.results))
          .catch(error => console.log(error));
      } else {
        setSuggestions([]);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSuggestionClick = (id) => {
    setInputValue('');
    setSuggestions([]);
    onLocationChange(id);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (suggestions.length > 0) {
      onLocationChange(suggestions[0].id);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Buscar ubicación por nombre"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit">Buscar</button>
      </form>
      <div>
        {suggestions.map(suggestion => (
          <div key={suggestion.id} onClick={() => handleSuggestionClick(suggestion.id)}>
            {suggestion.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationInput;
