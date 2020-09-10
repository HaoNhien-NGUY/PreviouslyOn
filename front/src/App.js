import React from 'react';
import './App.css';
import Navbar from './components/navbar';

import { StoreProvider } from './store/store';

function App() {
  return (
    <StoreProvider>
      <div className="App">
        <header className="App-header">
          <Navbar />
        </header>
      </div>
    </StoreProvider>
  );
}

export default App;
