import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';
import MovieDetails from './pages/MovieDetails';

function App() {



  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}/>
            <Route path="movie/:id" element={<MovieDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App
