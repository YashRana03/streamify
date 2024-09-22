import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';
import Details from './components/Details';
import Related from './components/Related';
import DetailPageLayout from './components/DetailPageLayout';
import Reviews from './components/Reviews';


function App() {



  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}/>
            <Route path="movie/:id"  element={<DetailPageLayout />} >
              <Route index element={<Details />}/>
              <Route path="reviews" element={<Reviews />} />
              <Route path="related" element={<Related />}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App
