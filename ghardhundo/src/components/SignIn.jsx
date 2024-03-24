import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import { toast } from 'sonner';
const SignIn = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    userType: 'user',
    name: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3001/api/auth/login${formData.userType}`, formData);
      console.log(response.data); // Handle success
      
        localStorage.setItem('token', response.authtoken)
        navigate('/'); // Redirect to home page
        toast.success("Login Successful")

    } catch (error) {
      console.error('Error signing in:', error); // Handle error
    }
  };

  const handleSliderChange = (index) => {
    setFormData(prevState => ({
      ...prevState,
      userType: index === 0 ? 'user' : 'owner'
    }));
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    beforeChange: (oldIndex, newIndex) => handleSliderChange(newIndex)
  };

  return (
    <div className="signin-container" >
      <Slider {...sliderSettings}>
        <div>

          <form onSubmit={handleSignIn} style={{ marginTop: '30px' }}>
            <div>
              <h3>Log In as User</h3>
              <label>Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <label>Password:</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <button type="submit">Sign In</button>
          </form>
          <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        </div>
        <div>

          <form onSubmit={handleSignIn} style={{ marginTop: '30px' }} >

            <div>
              <h3>Log In as Owner</h3>
              <label>Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
              <label>Password:</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <button type="submit">Sign In</button>
          </form>
          <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        </div>
      </Slider>
    </div>
  )
}

export default SignIn