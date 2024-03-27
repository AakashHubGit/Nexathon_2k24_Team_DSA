// HomeCard.jsx
import { Button } from 'antd';
import React, { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/HomeCard.css';

const HomeCard = (props) => {
    const [property, setProperty] = useState([]);
    const [interested, setInterested] = useState("Interested?")

    const getProperty = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/property/property/${props.id}`);
            console.log(response.data.properties);
            setProperty(response.data.properties);
        } catch (error) {
            console.error('Error fetching properties:', error);
        }
    }

    const addInterested = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/api/property/interested/${props.id}`)
            setInterested(`${props.interested} Are Interested in this Property`);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProperty(props.key)
    }, []);
    const handleInterested = () => {
        addInterested()
    }

    return (
        <AnimatePresence>
            <Link to={`/property/${props.id}`} style={{ textDecoration: 'none' }}>
                <motion.div whileHover={{ scale: 1.05 }} className='cardContainer mx-auto'>
                    <div className='image mx-auto'>
                        <LazyLoadImage
                            src={props.img}
                            width={'100%'}
                            height={'100%'}
                            effect='blur'
                            placeholderSrc={props.img}
                            style={{
                                borderRadius: '12px',
                            }}
                        />
                    </div>
                    <div className="cardDetails">
                        <div className="text">
                            <div className="label">Name:</div>
                            <div className="value">{props.name}</div>
                        </div>
                        {/* <div className="text">
                            <div className="label">Builder:</div>
                            <div className="value">{props.builder}</div>
                        </div> */}
                        <div className="text">
                            <div className="label">Location:</div>
                            <div className="value">{props.location}</div>
                        </div>
                        {/* <div className="text">
                            <div className="label">Construction Status:</div>
                            <div className="value">{props.status}</div>
                        </div> */}
                        <div className="text">
                            <div className="label">Price:</div>
                            <div className="value">&#x20B9;{props.price} {props.price_unit}</div>
                        </div>
                        <div className="text">
                            <div className="label">Size:</div>
                            <div className="value">{props.size}</div>
                        </div>
                        <div>
                            <Button type="primary" onClick={addInterested} >{interested}</Button>
                        </div>
                    </div>
                </motion.div>
            </Link>
        </AnimatePresence>
    )
}

export default HomeCard;
