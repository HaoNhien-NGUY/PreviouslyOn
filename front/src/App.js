import React, { useEffect } from 'react';
import { useStore } from './store/store';
import { authService } from './services/authService';

import Navbar from './components/navbar';
import Movies from './components/cinema/movies/getAllMovies';
import Shows from './components/cinema/shows/getAllShows';


function App() {
  const [store, dispatch] = useStore();

  //ici recuperation token du localstorage, 
  //req vers l'api pour verifier le token, 
  //dispatch user dans le store
  useEffect(() => {
    const access_token = authService.getToken();
    console.log(access_token);
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
