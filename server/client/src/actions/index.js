import axios from "axios";
import { FETCH_MOVIES, FETCH_MOVIE, AUTH_USER, AUTH_ERROR, ADD_MOVIE, FETCH_WATCHLIST_MOVIES } from './types';

export const fetchMovies = (page = 1) => dispatch => {
  axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=a50dd974dc6bceb5358b37229983facc&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
  ).then(function (response) {
    dispatch({ type: FETCH_MOVIES, payload: response.data });
  })
  .catch(function (error) {
    console.log(error);
  });
};

export const fetchMovie = (id) => dispatch => {
  axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=a50dd974dc6bceb5358b37229983facc&include_adult=false&include_video=false`
  ).then(function (response) {
    dispatch({ type: FETCH_MOVIE, payload: response.data });
  })
  .catch(function (error) {
    console.log(error);
  });
};

export const signup = (formProps, callback) => dispatch => {
  axios.post(
    '/auth/signup',
    formProps
  ).then(function (response) {
    dispatch({ type: AUTH_USER, payload: response.data });
    localStorage.setItem('token', response.data.token);
    callback();
  })
  .catch(function (error) {
    dispatch({ type: AUTH_ERROR, payload: error });
  });
};

export const signin = (formProps, callback) => dispatch => {
  axios.post(
    'http://localhost:5000/auth/signin',
    formProps
  ).then(function (response) {
    debugger;
    dispatch({ type: AUTH_USER, payload: response.data });
    localStorage.setItem('token', response.data.token);
    callback();
  })
  .catch(function (error) {
    dispatch({ type: AUTH_ERROR, payload: error });
  });
};

export const fetchUser = () => dispatch => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }
  };

  axios.get(
    'http://localhost:5000/auth/current_user',
    config
  ).then(function (response) {
    dispatch({ type: AUTH_USER, payload: response.data });
    localStorage.setItem('token', response.data.token);
  })
  .catch(function (error) {
    console.log(error);
  });
};

//does not need to go to the server
export const signout = (callback) => dispatch => {
  localStorage.removeItem('token');

  dispatch({ type: AUTH_USER, payload: '' });
  callback()
};

export const addMovieToWatchList = (movie) => dispatch => {
  console.log(movie);
  
  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }
  };

  axios.post(
    'http://localhost:5000/api/watchlist',
    { movie },
    config
  ).then(function (response) {
    dispatch({ type: ADD_MOVIE, payload: response.data });
  })
  .catch(function (error) {
    console.log(error);
  });
};

export const fetchWatchListMovies = () => dispatch => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }
  };

  axios.get(
    'http://localhost:5000/api/watchlist',
    config
  ).then(function (response) {
    dispatch({ type: FETCH_WATCHLIST_MOVIES, payload: response.data });
  })
  .catch(function (error) {
    console.log(error);
  });
};