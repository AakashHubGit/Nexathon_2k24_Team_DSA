
import { Routes,Route } from 'react-router-dom';
import './App.css';
import PropertyForm from './components/PropertyForm';
import SignUp from 'components/SignUp';

function App() {
  return (
    <>
      <Routes>
        { <Route path="/signup" element={<SignUp />} /> }
        { <Route path="/propertyform" element={<PropertyForm />}/>}
      </Routes>
    </>
  );
}

export default App;
