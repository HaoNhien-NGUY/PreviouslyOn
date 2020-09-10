import React from 'react';
import { StoreProvider } from './store/store';

import Navbar from './components/navbar';


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
