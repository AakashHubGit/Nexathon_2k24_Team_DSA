import React from 'react'
import { Carousel } from 'antd';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import '../css/HomeCard.css'

const styles = {
    width: '50vw',
    height: 'auto'
}

const Carousal = () => {
    return (
        <div>
            <h2>Type of Property On Our Site</h2>
            <div className='mx-auto ' style={styles}>
                <Carousel style={{ width: '100%', height: '' }} autoplay effect="fade">
                    <div>
                        <div style={{ position: '', width: '70vw', height: '50vh' }} className='imgBox'>
                            <LazyLoadImage
                                src='https://images.unsplash.com/photo-1630699144867-37acec97df5a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                                width={'100%'}
                                height={'100%'}
                                effect='blur'
                                placeholderSrc='https://images.unsplash.com/photo-1630699144867-37acec97df5a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

                            />
                            <h3 style={{ position: '', height:'20px', color:'black' }}>Apartment</h3>
                        </div>
                    </div>
                    <div>
                        <div style={{ position: '', width: '70vw', height: '50vh' }} className='imgBox'>
                            <LazyLoadImage
                                src='https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                                width={'100%'}
                                height={'100%'}
                                effect='blur'
                                placeholderSrc='https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

                            />
                             <h3 style={{ position: '', height:'20px' }}>Apartment</h3>
                        </div>
                    </div>
                    <div>
                        <div style={{ position: '', width: '70vw', height: '50vh' }} className='imgBox'>
                            <LazyLoadImage
                                src='https://images.unsplash.com/photo-1565623833408-d77e39b88af6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                                width={'100%'}
                                height={'100%'}
                                effect='blur'
                                placeholderSrc='https://images.unsplash.com/photo-1565623833408-d77e39b88af6?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

                            />
                             <h3 style={{ position: '', height:'20px' }}>Apartment</h3>
                        </div>
                    </div>
                    <div>
                        <div style={{ position: '', width: '70vw', height: '50vh' }} className='imgBox'>
                            <LazyLoadImage
                                src='https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                                width={'100%'}
                                height={'100%'}
                                effect='blur'
                                placeholderSrc='https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                                style={{ aspectRatio: '16/9' }}
                            />
                             <h3 style={{ position: '', height:'20px', color:'black' }}>Apartment</h3>
                        </div>
                    </div>
                </Carousel>
            </div>
        </div>
    )
}

export default Carousal
