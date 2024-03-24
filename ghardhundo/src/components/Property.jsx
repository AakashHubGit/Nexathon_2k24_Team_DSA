import React, { useState } from 'react';
import '../css/Property.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import '../css/HomeCard.css';
import { useEffect } from 'react';
import { Button, Modal } from 'antd';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Property = (props) => {
    const { id } = useParams();
    console.log(id);
    const [property, setProperty] = useState({});
    const [reportText, setReportText] = useState(''); // State to hold the value of the input field
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getProperty = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3001/api/property/property/${id}`);
            console.log(response.data);
            setProperty(response.data);
        } catch (error) {
            console.error('Error fetching properties:', error);
        }
    };

    useEffect(() => {
        getProperty(id);
    }, [id]);

    const addReport = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/api/property/report/${id}`, {
                report: reportText // Pass the report text as the request body
            });
            console.log(response.data);
            setIsModalOpen(false); // Close the modal after successful report addition
        } catch (error) {
            console.error('Error fetching properties:', error);
        }
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        addReport(); // Call the addReport function on modal confirmation
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onChange = (e) => {
        setReportText(e.target.value); // Update the report text state on input change
    };

    return (
        <div className='propertyContainer'>
            {property.property && (
                <>
                    <div className='imageContainer'>
                        <LazyLoadImage
                            src={property.property.filePath}
                            alt={property.property.name}
                            effect='blur'
                            placeholderSrc={property.property.filePath}
                            style={{
                                borderRadius: '20px'
                            }}
                        />
                    </div>
                    <div className='detailText'>
                        <div className="name">
                            <div>
                                <div className='building'>{property.property.name}</div>
                                <div className='builder'>by {property.property.builder}</div>
                            </div>
                            <div className="location">
                                <div>Location: {property.property.location}</div>
                            </div>
                        </div>
                        <div className="type">
                            <div>Property Type: {property.property.type}</div>
                            <div className='priceBox'>
                                <div className="priceText">Price:</div>
                                <div className="price">{property.property.price}</div>
                            </div>
                        </div>
                        <div className="sizebhk">{property.property.size}</div>
                        <div className="area">Area: {property.property.area}sq.ft</div>
                        <div className='nearbyP'>
                            <div className="nearby">Places Nearby:</div>
                            <div>
                                {property.property.places && property.property.places.map(p => (
                                    <div className="place">{p}, </div>
                                ))}
                            </div>

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
                        <div className="features">
                            <div className="nearby">Reports:</div>
                            {property.property.report }
                        </div>

                        <div onClick={showModal} className='btn btn-danger'>Report</div>
                        <Modal title="Report Listing" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                            <input type="text" name="report" value={reportText} onChange={onChange} />
                        </Modal>
                    </div>
                </>
            )}
        </div>
    );
};

export default Property;
