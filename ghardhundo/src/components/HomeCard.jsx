import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import '../css/HomeCard.css'
import card from '../assets/card.jpg';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState , useEffect} from 'react';



const HomeCard = (props) => {
    const [property, setproperty] = useState([])
    const getProperty=async()=>{
        try {
            const response = await axios.get(`http://localhost:3001/api/property/property/${props.id}`);
            console.log(response.data.properties);
            setproperty(response.data.properties);
          } catch (error) {
            console.error('Error fetching properties:', error);
          }
    }

    useEffect(() => {
      getProperty(props.key)
    }, [])
    
    return (
        <AnimatePresence>
            <Link to={`/property/${props.id}`} >
            <div className='cardContainer mx-auto'>
                <motion.div whileHover={{ scale: 1.05 }} className='image mx-auto'>
                    <LazyLoadImage
                        src={props.img}
                        width={'100%'}
                        height={'100%'}
                        effect='blur'
                        placeholderSrc={props.img}
                        style={{
                            borderTopLeftRadius: '12px',
                            borderBottomLeftRadius: '12px',
                        }}
                    />
                </motion.div>
                <div className="CardText">
                    <div className="text propName">
                        <div className="var key">Name:</div>
                        <div className="var value">{props.name}</div>
                    </div>
                    <div className="text buildName">
                        <div className="var key"> Builder Group:</div>
                        <div className="var value">{props.builder}</div>
                    </div>
                    <div className="text locName">
                        <div className="var key">Location:</div>
                        <div className="var value">{props.location}</div>
                    </div>
                    <div className="text status">
                        <div className="var key">Construction Status:</div>
                        <div className="var value">{props.status}</div>
                    </div>
                    <div className="text bhk">
                        <div className="var key">BHK</div>
                        <div className="var value">{props.bhk}</div>
                    </div>
                    <div className="text price">
                        <div className="var key">Price:</div>
                        <div className="var value">{props.price}</div>
                    </div>
                </div>
            </div>
            </Link>
        </AnimatePresence>
    )
}

export default HomeCard
