import React, { useState } from 'react';
import '../css/Property.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import '../css/HomeCard.css';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import { Button, Modal, Form, DatePicker, TimePicker } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';


const Property = (props) => {
    const navigate = useNavigate();
    const { id } = useParams();
    console.log(id);
    const [property, setProperty] = useState({});
    const [reportText, setReportText] = useState(''); // State to hold the value of the input field
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [appModalOpen, setappModalOpen] = useState(false);
    const [owner, setOwner] = useState({})

    const token=localStorage.getItem('token');
    console.log(token);


    const format = 'HH:mm';


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
        getOwner()
    }, [id]);


    const addReport = async () => {
        try {
            const response = await axios.put(`http://localhost:4000/api/property/report/${id}`, {
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


    const showAppModal = () => {
        setappModalOpen(true);
    };

    const handleAppOk = () => {
        if (localStorage.getItem('token')) {
            addAppoint();
        }
        else {
            navigate('/signin')
        }
    };

    const handleAppCancel = () => {
        setappModalOpen(false);
    };

    const [appForm, setAppForm] = useState({
        appDate: '',
        appTime: null,
    });

    const getOwner = async () => {
        if (property && property.property) {
            const response = await axios.get(`http://localhost:3001/api/auth/getowner/${property.property.owner}`);
            setOwner(response.data);
            console.log(response);
        }
    };

    const addAppoint = async () => {
        try {
          const response = await axios.post(
            'http://localhost:3001/api/appoint/addappoint',
            {
              property: id,
              owner: owner._id,
              date: appForm.appDate,
              time: appForm.appTime
            },
            {
              headers: {
                'auth-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
              }
            }
          );
          const data = response.data;
          // Handle the response data here
        } catch (error) {
          // Handle errors here
          console.error('Error adding appointment:', error);
        }
      };



    const onAppDateChange = (date, dateString) => {
        setAppForm({ ...appForm, appDate: dateString });
    };

    const onAppTimeChange = (time, timeString) => {
        setAppForm({ ...appForm, appTime: time });
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
                            width={'100%'}
                            height={'100%'}
                            placeholderSrc={property.property.filePath}
                            style={{
                                borderRadius: '20px'
                            }}
                        />
                    </div>
                    <div className='detailText'>
                        {
                            localStorage.getItem('token') &&
                            <div onClick={showAppModal} className='btn btn-primary'>
                                Add Appointment
                            </div>
                        }

                        <Modal title="Add Appointment" visible={appModalOpen} onOk={handleAppOk} onCancel={handleAppCancel}>
                            <Form layout='vertical'>
                                <Form.Item name="appDate"
                                    label="Appointment Date" rules={[{ required: true, message: 'Please input the Appointment Date!' }]}>
                                    <DatePicker name="appDate" value={appForm.appDate}
                                        onChange={(date, dateString) => onAppDateChange(date, dateString)} />
                                </Form.Item>
                                <Form.Item name="appTime"
                                    label="Appointment Time" rules={[{ required: true, message: 'Please input the Appointment Time!' }]}>
                                    <TimePicker defaultValue={dayjs('00:00', format)} onChange={onAppTimeChange} format={format} />
                                </Form.Item>
                            </Form>
                        </Modal>
                        <div className="name">

                            <div>
                                <div className='building'>{property.property.name}</div>
                                <div className='builder'>by {property.property.builder}</div>

                                <div className="location">
                                    <div>Location: {property.property.location}</div>
                                </div>
                            </div>
                            <div>
                                {`${property.property.interested} users are interested in this property`}
                            </div>

                        </div>
                        <div className="type">
                            <div>Property Type: {property.property.type}</div>
                            <div className='priceBox'>
                                <div className="priceText">Price:</div>
                                <div className="price">{property.property.price} Cr</div>
                            </div>
                        </div>
                        <div className="sizebhk">{property.property.size}</div>
                        <div className="area">Area: {property.property.area}sq.ft</div>
                        <div className='nearbyP'>

                            <div>
                                {property.property.places && property.property.places.map(p => (
                                    <>
                                        <div className="nearby">Places Nearby:</div>
                                        <div className="place">{p}, </div>
                                    </>
                                ))}
                            </div>

                        </div>

                        <div className='statusBox'>
                            <div className="statusText">Construction Status:</div>
                            <div className="status">{property.property.status}</div>
                        </div>
                        <div className="amenities">
                            <div>

                                {property.property.amenities && property.property.amenities.map(p => (
                                    <>
                                        <div className="nearby">Amenities:</div>
                                        <div className="place">{p}, </div>
                                    </>
                                ))}
                            </div>
                            <div>
                                <div className="features">

                                    {property.property.features && property.property.features.map(p => (
                                        <>
                                            <div className="nearby">Features:</div>
                                            <div className="place">{p}, </div>
                                        </>
                                    ))}

                                </div>
                            </div>
                        </div>
                        <div className="features">

                            {property.property.report && property.property.report.map(p => (
                                <>
                                    <div className="nearby">Reports:</div>
                                    <div className="place">{p}, </div>
                                </>
                            ))}
                        </div>
                        <div onClick={showModal} className='btn reportBtn btn-danger'>Report</div>
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
