import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee, faStar, faStarHalf, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faStar as faRegStar } from '@fortawesome/free-regular-svg-icons'

import './App.css';
import GamesView from '../gamesView/GamesView';

library.add(faStar, faRegStar, faPencilAlt, faTrashAlt)

function App() {
  return (
    <div className="App">
      <header>
        <h1>Sports blog</h1>
      </header>
      <GamesView />
    </div>
  );
}

export default App;
