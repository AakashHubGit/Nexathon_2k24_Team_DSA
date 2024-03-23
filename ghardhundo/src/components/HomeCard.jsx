import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import '../css/HomeCard.css'
import card from '../assets/card.jpg';
import { motion, AnimatePresence } from 'framer-motion';


const HomeCard = (props) => {
    return (
        <AnimatePresence>
            <div className='cardContainer mx-auto'>
                <motion.div whileHover={{ scale: 1.1 }} className='image mx-auto'>
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
                        <div className="key">Name:</div>
                        <div className="value">{props.name}</div>
                    </div>
                    <div className="text buildName">
                        <div className="key"> Builder Group:</div>
                        <div className="value">{props.builder}</div>
                    </div>
                    <div className="text locName">
                        <div className="key">Location:</div>
                        <div className="value">{props.location}</div>
                    </div>
                    <div className="text status">
                        <div className="key">Construction Status:</div>
                        <div className="value">{props.status}</div>
                    </div>
                    <div className="text bhk">
                        <div className="key">BHK</div>
                        <div className="value">{props.bhk}</div>
                    </div>
                    <div className="text price">
                        <div className="key">Price:</div>
                        <div className="value">{props.price}</div>
                    </div>
                </div>
            </div>
        </AnimatePresence>
    )
}

export default HomeCard
