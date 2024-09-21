import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';
import Details from './components/Details';
import Related from './components/Related';
import DetailPageLayout from './components/DetailPageLayout';


function App() {



  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}/>
            <Route path="movie/:id"  element={<DetailPageLayout />} >
              <Route path="details" element={<Details />}/>
              <Route path="related" element={<Related />}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App
