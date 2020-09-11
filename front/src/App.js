import React from 'react';
import { useStore } from './store/store';

import Navbar from './components/navbar';
import Movies from './components/cinema/movies/movies';
import Shows from './components/cinema/shows/shows';


function App() {
  const [store, dispatch] = useStore();



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
