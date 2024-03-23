import React from 'react'
import heroImg from '../assets/hero.jpg'
import '../css/Hero.css'
import { Input, Space } from 'antd';
const { Search } = Input;

const Hero = () => {
  return (
    <div className='heroContainer'>
      <img className='heroImg' src={heroImg} alt="" />
      <div className="overlay">
        <div className='heroText'>Find Your Dream Ghar</div>
        <Search
      placeholder={`Try "Property in Thane with area of 1000sqft"`}
            allowClear
      enterButton="Search"
      size="large"
      onSearch={{}}
    />
      </div>
    </div>
  )
}

export default Hero
