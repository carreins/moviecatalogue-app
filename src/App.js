/*IMPORTS */
/*React module dependencies */
import { BrowserRouter, Route, Routes } from 'react-router-dom';

/*Custom components */
import Frontpage from './components/Frontpage/Frontpage';
import SearchMovies from './components/SearchMovies/SearchMovies';

/*Context provider */
import FilterContextProvider from './storage/search-context';

/*Stylesheet import */
import './App.css';

/*IMPORTS END */

function App() {

  /*Content */
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
