import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import '../css/HomeCard.css'
import heroImg from '../assets/hero.jpg'


const HomeCard = () => {
    return (
        <div className='cardContainer mx-auto'>
            <div className='image mx-auto'>
                <LazyLoadImage
                    src={heroImg}
                    width={'100%'}
                    height={'100%'}
                    effect='blur'
                    placeholderSrc={heroImg}
                />
            </div>
            <div className="CardText">
                NAme
            </div>
        </div>
    )
}

export default HomeCard
