import React from 'react'
import adobeImg from '../../Assets/Adobe2.png'
import { Link, useLocation } from 'react-router-dom'
const WebApiServiceDetails = (props) => {
    const location = useLocation();
    const propsData = location.state;
    return (
        <>{propsData?.title ?
            <div className="productDetailsContainer">
                <div className="productDetails">
                    <div className="productImg">
                        <img src={adobeImg} alt="" />
                    </div>
                    <div className="productName">
                        <h1>Adobe Experience Manager (AEM) API</h1>
                    </div>
                </div>
                <div className="productDescription">
                    <div className="details">
                        <h1>Description</h1>
                        <p>{propsData?.description ?? "Description Not Found"}</p>
                    </div>
                    <div className="details">
                        <h1>Swagger</h1>
                        <p>{propsData['x-origin'][0].url ?? "URL Not Found"}</p>
                    </div>
                    <div className="details">
                        <h1>Contact</h1>
                        <div className="contactDetails">
                            <h1>Email</h1>
                            <p>{propsData?.contact?.email ?? "Email Not Found"}</p>
                        </div>
                        <div className="contactDetails">
                            <h1>Name</h1>
                            <p>{propsData?.contact?.name ?? "Name Not Found"}</p>
                        </div>
                        <div className="contactDetails">
                            <h1>Url</h1>
                            <p>{propsData?.contact?.url ?? "URL Not Found"}</p>
                        </div>
                    </div>
                </div>
                <div className="productContainer">
                    <div>
                        <Link to={'/'}><button className='exploreBtn'>Explore web APIs</button></Link>
                    </div>
                </div >
            </div > : <p className="datanotfound">No Data Found</p>}

        </>
    )
}

export default WebApiServiceDetails