import React, { useEffect } from 'react';
import { useStore, ACTIONS } from './store/store';
import { authService } from './services/authService';
import { betaseriesAPI } from './services/betaseriesAPI';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from './components/navbar/navbar';
import Movies from './components/pages/movies/getAllMovies';
import Shows from './components/pages/shows/getAllShows';
import ShowTest from './components/pages/shows/showDetails';
import Home from './components/pages/home/home';
import Profil from './components/pages/profil/profil';
import Amis from './components/pages/amis/amis';

function App() {
  const [store, dispatch] = useStore();

  //resume session if valid token is found
  useEffect(() => {
    const access_token = authService.getToken();

    if (access_token) {
      betaseriesAPI.getUserInfo(access_token)
        .then(response => {
          const { login, avatar, locale, id } = response.data.member;
          dispatch({ type: ACTIONS.LOGIN, payload: { login, access_token, avatar, locale, id } });
        })
        .catch(() => dispatch({ type: ACTIONS.USER_LOADING_DONE }));
    } else {
      dispatch({ type: ACTIONS.USER_LOADING_DONE });
    }

  }, []);

  return (
    <div className="App">
      <Router basename={process.env.PUBLIC_URL}>
        <header className="App-header">
          <Navbar />
        </header>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/shows" component={Shows} />
          <Route exact path="/shows/:id" component={ShowTest} />
          <Route exact path="/movies" component={Movies} />
          <Route exact path="/profil/:id" component={Profil} />
          <Route exact path="/profil/:id/friends" component={Amis} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
