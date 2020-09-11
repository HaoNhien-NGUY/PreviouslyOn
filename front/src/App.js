import React from 'react';
import { useStore } from './store/store';

import Navbar from './components/navbar';


function App() {
  const [store, dispatch] = useStore();

  

  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
    </div>
  );
}

export default App;
