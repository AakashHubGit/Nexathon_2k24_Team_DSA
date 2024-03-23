import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'antd';
import '../css/Modal.css'
import { Flex, Radio } from 'antd';

const Modale = () => {
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedProperty, setSelectedProperty] = useState("");
    const handleCityChange = (e) => {
        console.log(`Selected City: ${e.target.value}`);
        setSelectedCity(e.target.value);
    };

    const handlePropertyChange = (e) => {
        console.log(`Selected Property: ${e.target.value}`);
        setSelectedProperty(e.target.value);
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        showModal(); // Open modal when component mounts
    }, []); 

    return (
        <div className='modalBack'>
            {/* <Button type="primary" onClick={showModal}>
                Open Modal
            </Button> */}
            <Modal title="Preference"  open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div className='city'>
                    <p className='modaltitle'>Select City: </p>
                    <Radio.Group onChange={handleCityChange} value={selectedCity}>
                        <Radio.Button value="Andheri">Andheri</Radio.Button>
                        <Radio.Button value="Bandra">Bandra</Radio.Button>
                        <Radio.Button value="Thane">Thane</Radio.Button>
                        <Radio.Button value="Parel">Parel</Radio.Button>
                        <Radio.Button value="Ghatkopar">Ghatkopar</Radio.Button>
                    </Radio.Group>
                </div>
                <div className='modaltitle property'>
                    <p>Select Property: </p>
                    <Radio.Group onChange={handlePropertyChange} value={selectedProperty}>
                        <Radio.Button value="Apartment">Apartment</Radio.Button>
                        <Radio.Button value="Villas">Villas</Radio.Button>
                        <Radio.Button value="Duplex">Duplex</Radio.Button>
                        <Radio.Button value="Penthouse">Penthouse</Radio.Button>
                    </Radio.Group>
                </div>
            </Modal>

        </div>
    )
}

export default Modale
