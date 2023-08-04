import React, { useEffect, useState } from 'react';
import '../../App.css'
import axios from 'axios';

import Arrow from "../../Assets/Arrow.png";
import Adobe from "../../Assets/Adobe.png";
import { Link } from 'react-router-dom';

const SideMenuScreen = () => {

    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const [providers, setProviders] = useState({});
    const [activeStates, setActiveStates] = useState([]);

    const handleAccordionClick = (item, index) => {
        setActiveStates((prevStates) => {
            const newStates = [...prevStates];
            newStates[index] = !newStates[index];
            return newStates;
        });
    };
    const getListOfProviders = async () => {
        try {
            const response = await axios.get(
                `https://api.apis.guru/v2/providers.json`
            );
            // response?.data?.data.map((provider) => {
            for (let i = 0; i < response?.data?.data.length; i++) {
                if (response?.data?.data[i]) {
                    await detailData(response?.data?.data[i]);
                }
            }
            // });
            setActiveStates(new Array(response?.data?.data?.length).fill(false));
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        getListOfProviders();
    }, []);

    const detailData = async (provider) => {
        try {
            const response = await axios.get(
                `https://api.apis.guru/v2/${provider}.json`
            );
            setProviders((data) => ({
                ...data,
                [`${provider}`]: {
                    ...response?.data?.apis[provider]?.info,
                },
            }));
        } catch (error) {
            console.log("error fetching data:", error);
        }
    };

    useEffect(() => {
        // detailData();
    }, [providers]);

    return (
        <>
            <div
                className='collapsedSidebar'
                style={{
                    position: 'fixed',
                    top: 0,
                    right: isOpen ? 0 : '-500px',
                    width: '520px',
                    height: '100%',
                    backgroundColor: '#42607B',
                    transition: 'right 0.3s ease',
                    color: 'white',
                    zIndex: 2,
                    overflow: 'auto'
                }}

            >
                <div style={{ padding: '20px' }}>
                    <h2 style={{ textAlign: 'center' }}>Select Provider</h2>
                    {Object.keys(providers).map((item, index) => {
                        const isActive = activeStates[index];
                        return (
                            <div className="accordion" key={index}>
                                <div className={`accordion-item ${isActive ? 'accordianContainer' : ''}`}>
                                    <div
                                        className="accordion-title"
                                        onClick={() => handleAccordionClick(item, index)}
                                    >
                                        <div className="accordion_title">{item}</div>
                                        {isActive ? (
                                            <img src={Arrow} alt="No Image" className="arrowup" />
                                        ) : (
                                            <img src={Arrow} alt="No Image" className="arrowdown" />
                                        )}
                                    </div>
                                    {isActive && (
                                        <div className="">
                                            <Link to="WebApiServiceDetails" state={providers[item]}>
                                                <div className="accordion-content">
                                                    <img src={Adobe} alt="" />
                                                    <p className="m-0">{providers[item].title ?? "No Data Found"}</p>
                                                </div>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className={isOpen ? "mainComponent backdrop" : "mainComponent"} onClick={() => {
                if (isOpen) setIsOpen(false);
            }}>
                <div className="container">
                    <button onClick={() => setIsOpen(true)} className='exploreBtn'>Explore Web APIs</button>
                </div>
            </div>

        </>
    );
};

export default SideMenuScreen;