import React from 'react'
import '../css/Property.css'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import '../css/HomeCard.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const Property = (props) => {
    const { id } = useParams()
    console.log(id);
    const [property, setproperty] = useState({})
    const getProperty = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3001/api/property/property/${id}`);
            console.log(response.data);
            await setproperty(response.data);
        } catch (error) {
            console.error('Error fetching properties:', error);
        }
    }

    useEffect(() => {
        getProperty(id)
    }, [])




    return (
        <div className='propertyBack'>
            {property.property && (
                <>
                    <div className='imgBack mx-auto'>
                        <LazyLoadImage
                            src={property.property.filePath}
                            width={'100%'}
                            height={'100%'}
                            effect='blur'
                            placeholderSrc={property.property.filePath}
                            style={{
                                borderRadius: "20px"
                            }}
                        />
                    </div>
                    <div className='detailText'>
                        <div className="name">
                            <div className='building'>{property.property.name}</div>
                            <div className='builder'>by {property.property.builder}</div>
                        </div>
                        <div className="location">
                            <h2>Location: {property.property.location}</h2>
                        </div>
                        <div className="type">
                            <div>Property Type: {property.property.type}</div>

                        </div>
                        <div className="sizebhk">{property.property.size}</div>
                        <div className="area">Area: {property.property.area}sq.ft</div>
                        <div className='nearbyP'>
                            <div className="nearby">Places Nearby:</div>
                            {property.property.places && property.property.places.map(p => (
                                <div className="place">{p}, </div>
                            ))}

                        </div>
                        <div className='priceBox'>
                            <div className="priceText">Price:</div>
                            <div className="price">{property.property.price}</div>
                        </div>
                        <div className='statusBox'>
                            <div className="statusText">Construction Status:</div>
                            <div className="status">{property.property.status}</div>
                        </div>
                        <div className="amenities">
                        <div className="nearby">Amenities:</div>
                            {property.property.amenities && property.property.amenities.map(p => (
                                <div className="place">{p}, </div>
                            ))}
                        </div>
                        <div className="features">
                        <div className="nearby">Features:</div>
                            {property.property.features && property.property.features.map(p => (
                                <div className="place">{p}, </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

        </div>
    )
}

export default Property
