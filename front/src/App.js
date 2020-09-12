import React, { useEffect } from 'react';
import { useStore, ACTIONS } from './store/store';
import { authService } from './services/authService';
import { betaseriesAPI } from './services/betaseriesAPI';

import Navbar from './components/navbar/navbar';
import Movies from './components/cinema/movies/getAllMovies';
import Shows from './components/cinema/shows/getAllShows';


function App() {
  const [store, dispatch] = useStore();

  //resume session if valid token is found
  useEffect(() => {
    const access_token = authService.getToken();

    if (access_token) {
      betaseriesAPI.getUserInfo(access_token)
        .then(response => {
          const { login, avatar, locale } = response.data.member;
          dispatch({ type: ACTIONS.LOGIN, payload: { login, access_token, avatar, locale }});
        })
        .catch(() => dispatch({ type: ACTIONS.USER_LOADING_DONE }));
    } else {
      dispatch({ type: ACTIONS.USER_LOADING_DONE });
    }

  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
      {/* <Movies /> */}
      <Shows />
    </div>
  );
}

export default App;
