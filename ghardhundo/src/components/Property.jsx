import React, { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../css/Property.css';

const Property = () => {
    const { id } = useParams();
    const [property, setProperty] = useState({});

    useEffect(() => {
        const getProperty = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/property/property/${id}`);
                setProperty(response.data);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        getProperty();
    }, [id]);

    return (
        <div className='propertyContainer'>
            {property.property && (
                <>
                    <div className='imageContainer'>
                        <LazyLoadImage
                            src={property.property.filePath}
                            alt={property.property.name}
                            effect='blur'
                            className='propertyImage'
                        />
                    </div>
                    <div className='detailsContainer'>
                        <div className='propertyDetails'>
                            <h1 className='buildingName'>{property.property.name}</h1>
                            <h2 className='builderName'>by {property.property.builder}</h2>
                            <div className='location'>Location: {property.property.location}</div>
                            <div className='propertyType'>Property Type: {property.property.type}</div>
                            <div className='sizeBhk'>{property.property.size}</div>
                            <div className='area'>Area: {property.property.area} sq.ft</div>
                            <div className='placesNearby'>
                                <span className='label'>Places Nearby:</span> {property.property.places.join(', ')}
                            </div>
                            <div className='price'>
                                <span className='label'>Price:</span> {property.property.price}
                            </div>
                            <div className='status'>
                                <span className='label'>Construction Status:</span> {property.property.status}
                            </div>
                            <div className='amenities'>
                                <span className='label'>Amenities:</span> {property.property.amenities.join(', ')}
                            </div>
                            <div className='features'>
                                <span className='label'>Features:</span> {property.property.features.join(', ')}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Property;