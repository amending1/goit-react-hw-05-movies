import React, { useState } from 'react';
import css from './movies.module.css';

function Movies() {
const [searchQuery, setSearchQuery] = useState('');
const [searchResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response =await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=55b41f82a3d9f463669460bf70677f68`);
            const data = await response.json();
            setSearchQuery(data.results);
        } catch (error) {
            console.error('Error fetching search results', error);
        }
    }
return (
    <div>
        <h2 className={css['page-header']}>Search Movie</h2>
        <input type='text' value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} className={css['search-input']}/>
        <button onClick={handleSearch} className={css['search-button']}>Search</button>
        <ul>
            {searchResults.map(movie => (
                <li key={movie.id}>
                    <a href={`/movies/${movie.id}`}>{movie.title}</a>
                    </li>
            ))}
        </ul>
    </div>
);
}

export default Movies;

