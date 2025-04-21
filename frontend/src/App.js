import logo from './logo.svg';
import './App.css';
import SearchBar from './Components/SearchBar';
import SearchResults from './Components/SearchResults';
import { useState } from 'react';


function App() {
  
  const [selectedCity, setSelectedCity] = useState(null);

  return (
    <div className="App">
      <SearchBar onSelectedCity={ setSelectedCity } />
      <SearchResults selectedCity={ selectedCity } />
    </div>
  );
}

export default App;
