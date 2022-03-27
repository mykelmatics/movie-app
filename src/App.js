/** @format */

// import logo from './logo.svg';

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavorites from "./components/AddFavorites";
import RemoveFavorites from "./components/RemoveFavorites";

function App() {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const getMovieRequest = async (searchValue) => {
    if (searchValue !== "") {
          const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=${process.env.REACT_APP_MOVIE_API}`;
          const response = await fetch(url);
          const responseJson = await response.json();
          console.log(responseJson);
          if (responseJson.Search) {
            setMovies(responseJson.Search);
          }
    }
  };
  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);
  const saveToLocalStorage = (items) => {
    localStorage.setItem('movie-app', JSON.stringify(items))
   
  }
  useEffect(() => {
    const movieFavourites = JSON.parse(localStorage.getItem('movie-app'))  
    setFavourites(movieFavourites)
  }, [])
  
  const addFavourite = (movie) => {
    const checkFavorite = favourites.filter(
      (favourite) => favourite.imdbID === movie.imdbID
    );
    if (!checkFavorite || checkFavorite.length === 0) {
      const newFavoriteList = [...favourites, movie];
      setFavourites(newFavoriteList);
      saveToLocalStorage(newFavoriteList)
    }
  };
  const removeFavourite = (movie) => {
    const newFavoriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );
    setFavourites(newFavoriteList);
    saveToLocalStorage(newFavoriteList)
  };
  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Movies" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row">
        <MovieList
          movies={movies}
          handleFavouriteClick={addFavourite}
          favouriteComponent={AddFavorites}
        />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Favorites" />
      </div>
      <div className="row">
        <MovieList
          movies={favourites}
          handleFavouriteClick={removeFavourite}
          favouriteComponent={RemoveFavorites}
        />
      </div>
    </div>
  );
}

export default App;
