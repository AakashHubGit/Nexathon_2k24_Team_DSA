import React,{useState} from 'react';
import { Routes,Route } from 'react-router-dom';
import './App.css';
import PropertyForm from './components/PropertyForm';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Navbar from './components/Navbar';
import Home from './components/Home';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <>
    <Navbar  isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path='/' element={<Home/>}/>
        { <Route path="/signup" element={<SignUp setIsAuthenticated={setIsAuthenticated} />} /> }
        { <Route path="/signin" element={<SignIn setIsAuthenticated={setIsAuthenticated} />} /> }
        { <Route path="/propertyform" element={<PropertyForm />}/>}
      </Routes>
    </>
  );
}

export default App;
