import './App.css';
import { Routes, Route } from 'react-router-dom';
import SignIn from './components/signin/SignIn';
import SignUp from './components/signup/SignUp';
import Navbar from './components/navbar/Navbar';
import Hero from './components/hero/Hero';
import Properties from './components/properties/Properties';
import PropertyDetails from './components/propertyDetail/PropertyDetails';
import PopularProperties from './components/popularProperties/PopularProperties';
import FeaturedProperties from './components/featuredProperties/FeaturedProperties';
import Newsletter from './components/newsletter/Newsletter';
import Footer from './components/footer/Footer';

function App() {
  return (
    <div>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Navbar />
              <Hero />
              <PopularProperties />
              <FeaturedProperties />
              <Newsletter />
              <Footer />
            </>
          }
        />
        <Route
          path='/about'
          element={
            <>
              <Navbar />
              <Footer />
            </>
          }
        />
        <Route
          path='/featured'
          element={
            <>
              <Navbar />
              <FeaturedProperties />
            </>
          }
        />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />

        <Route
          path='/properties'
          element={
            <>
              <Navbar />
              <Properties />
              <Footer />
            </>
          }
        />
        <Route
          path='/propertyDetail/:id'
          element={
            <>
              <Navbar />
              <PropertyDetails />
              <Footer />
            </>
          }
        />
        {/* <Route path='/properties' element ={} />
        <Route path='/propertyDetail/:id' element ={} /> */}
      </Routes>
    </div>
  );
}

export default App;
