import React from 'react';
import './App.css';
import ProductList from '../ProductsList/ProductsList';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Products control app</h1>
      </header>
      <ProductList />
    </div>
  );
}

export default App;
