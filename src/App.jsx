import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';
import DetailsSection from './components/DetailsSection';
import RelatedSection from './components/RelatedSection';
import DetailPageLayout from './components/DetailPageLayout';
import ReviewsSection from './components/ReviewsSection';


function App() {



  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}/>
            <Route path="movie/:id"  element={<DetailPageLayout />} >
              <Route index element={<DetailsSection />}/>
              <Route path="reviews" element={<ReviewsSection />} />
              <Route path="related" element={<RelatedSection />}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App
