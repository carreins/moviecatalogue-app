import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Frontpage from './components/Frontpage/Frontpage';
import SearchMovies from './components/SearchMovies/SearchMovies';

import FilterContextProvider from './storage/search-context';

import './App.css';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Frontpage />}/>
        </Routes>
        <FilterContextProvider>
          <Routes>
            <Route path='/search' element={<SearchMovies />}/>
          </Routes>
        </FilterContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
