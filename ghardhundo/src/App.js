
import { Routes,Route } from 'react-router-dom';
import './App.css';
import PropertyForm from './components/PropertyForm';
import SignUp from './components/SignUp';
import Navbar from './components/Navbar';
import Home from './components/Home';

function App() {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        { <Route path="/signup" element={<SignUp />} /> }
        { <Route path="/propertyform" element={<PropertyForm />}/>}
      </Routes>
    </>
  );
}

export default App;
