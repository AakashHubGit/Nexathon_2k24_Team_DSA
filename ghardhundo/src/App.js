import React,{useState} from 'react';
import { Routes,Route } from 'react-router-dom';
import './App.css';
import PropertyForm from './components/PropertyForm';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { Toaster } from 'sonner';
import Property from 'components/Property';
function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <>
    <Navbar  isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/property/:id' element={<Property/>}/>
        { <Route path="/signup" element={<SignUp setIsAuthenticated={setIsAuthenticated} />} /> }
        { <Route path="/signin" element={<SignIn setIsAuthenticated={setIsAuthenticated} />} /> }
        { <Route path="/propertyform" element={<PropertyForm />}/>}
      </Routes>
      <Toaster richColors={true}/>
    </>
  );
}

export default App;
