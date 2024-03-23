import React from 'react'
import Hero from './Hero'
import HomeCard from './HomeCard'
import Modale from './Modale'

const Home = () => {
  return (
    <div>
      <Hero/>
      <HomeCard img='https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      name='Tushar Towers' builder='Lodha Group' location='Thane' status='Under Construction' bhk='1BHK' price='1.5 Cr' />
       <HomeCard
        img='https://images.unsplash.com/photo-1610526662524-bd113e746fdb?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        name='Serene Heights'
        builder='XYZ Developers'
        location='Mumbai'
        status='Ready to Move'
        bhk='2BHK'
        price='2.2 Cr'
      />
      <HomeCard
        img='https://images.unsplash.com/photo-1597047084993-bf337e09ede0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        name='Sunset Apartments'
        builder='ABC Builders'
        location='Bangalore'
        status='Under Construction'
        bhk='3BHK'
        price='3.5 Cr'
      />
      <HomeCard
        img='https://images.unsplash.com/photo-1610402919524-dcd64aa0b17b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        name='Gardenia Residency'
        builder='PQR Constructions'
        location='Chennai'
        status='Under Construction'
        bhk='4BHK'
        price='5.0 Cr'
      />
      <HomeCard
        img='https://images.unsplash.com/photo-1533280385001-c32ffcbd52a7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        name='Hillside Retreat'
        builder='MNO Developers'
        location='Pune'
        status='Ready to Move'
        bhk='2BHK'
        price='2.8 Cr'
      />
      <Modale/>
    </div>
  )
}

export default Home
