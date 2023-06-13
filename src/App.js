import { useEffect, useState } from "react";


import './App.css';
import searchIcon from './search.svg';
import MovieCard from "./MovieCard";

const apiKey = '79aaa639';

const API_URL = `http://www.omdbapi.com?apikey=${apiKey}`;



const App = () => {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('');

    const searchMovies = async (search) => {
        const response = await fetch(`${API_URL}&s=${search}`);
        const data = await response.json();
        (typeof data.Search) != 'undefined' && data.Search.length > 0 ?
            setMovies(data.Search) : setMovies([]);
    }

    useEffect(() => {
        searchMovies('John Wick');
    }, [])


    return (
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input placeholder="Search for Movies"

                    onChange={(e) => { setSearch(e.currentTarget.value) }}
                />
                <img src={searchIcon} alt="search"
                    onClick={() => {
                        searchMovies(search);
                    }}

                />
            </div>

            {movies.length > 0 ?
                (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie={movie} />
                        ))}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )}




        </div>
    );
}

export default App;