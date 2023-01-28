import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Movie from "./Movie";
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, fetchWatchListMovies } from '../actions';
import InfiniteScroll from 'react-infinite-scroller';
import useMovies from '../useMoviesHook';
import WatchList from './WatchList';

const MovieList = ({ type }) => {
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const totalPages = useSelector(state => state.total_pages);

  const {
    movieOrder,
    movies,
    getMovies
  } = useMovies(type); 

  const loadItems = (page) => {
    if (page < totalPages || totalPages === 0) {
      getMovies(page);
    } else {
      setHasMoreItems(false);
    }
  };

  const movieComponents = movieOrder.map((id) => {
    const movie = movies[id];

    const url = (type === 'discover') ? `/${id}` : `watch-list/${id}`

    return <Movie id={movie.id} key={id} title={movie.title} img={movie.poster_path} url={url} />
  });

  //use type so that we're able to reuse a component
  if (type === 'discover') {
    return (
      <InfiniteScroll
        loadMore={loadItems}
        pageStart={0}
        hasMore={hasMoreItems}>
        <MovieGrid>
          {movieComponents}
        </MovieGrid>
      </InfiniteScroll>
    )
  } else {
    return (
      <WatchList fetchMovies={getMovies}>
        <MovieGrid>
          {movieComponents}
        </MovieGrid>
      </WatchList>
    )
  }
}

export default MovieList;

const MovieGrid = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 2em;
  margin: 0 auto;
`;