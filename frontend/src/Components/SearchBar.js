import { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';


function SearchBar({ onSelectedCity }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showDropDown, setShowDropDown] = useState(false);
    const dropDownRef = useRef(null);

    // To set the dropdown visiblity
    const handleChange = (e) => {
        setSearchQuery(e.target.value);
        setShowDropDown(true);
    };

    // To handle selected city
    const handleSelectCity = (city) => {
        setSearchQuery(city.name);
        setShowDropDown(false);
        onSelectedCity(city);
    }

    // For the dropdown menu suggestions
    useEffect(() => {
        const fetchSuggestions = async () => {
            if (searchQuery.length > 0) {
                try {
                    const res = await fetch(`/suggestions?name=${searchQuery}`);
                    const data = await res.json();

                    if (res.ok && Array.isArray(data.sortedData)) {
                        setSuggestions(data.sortedData);
                    } else {
                        setSuggestions([]);
                    }
                } catch (error) {
                    toast.error(error.message);
                    setSuggestions([]);
                }
            } else {
                setSuggestions([]); 
            }
        };

        fetchSuggestions();

    }, [searchQuery]);

    // To close the drop down menu when clicked outside
    useEffect(() => {
        const dropDownHandler = (e) => {
            // Checks if the ref exists and the click was outside of that element
            if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
                setShowDropDown(false);
            }
        }

        document.addEventListener('mousedown', dropDownHandler);

        return () => {
            document.removeEventListener('mousedown', dropDownHandler);
        }
    }, []);

    return (
        <>
            <Container ref={dropDownRef}>
                <h1>Search for Location</h1>
                <InputGroup className='mb-2' size='lg'>
                    <FormControl 
                        placeholder='Enter City Name'
                        type="input"
                        value={searchQuery}
                        onChange={handleChange}
                        onFocus={() => setShowDropDown(true)}
                    />
                </InputGroup>
                {(showDropDown && searchQuery.length > 0) ? (
                    suggestions.length > 0 ? (
                    <div className="dropdown-menu show w-50 mt-2">
                        {suggestions.map((city, index) => (
                            <button
                                className='dropdown-item text-wrap'
                                key={index}
                                onClick={() => handleSelectCity(city)}
                            >
                                <div>{city.name}</div>
                                <small className="text-muted">Latitude: {city.lat}, Longitude: {city.long}</small>
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="dropdown-menu show w-100 mt-2">
                        <div className="dropdown-item text-muted">No results found</div>
                    </div>
                )) : null}
            </Container>
        </>
    )
}

export default SearchBar;


