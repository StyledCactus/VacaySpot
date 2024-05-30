
import "./App.css";
import logo from './images/Logo.png'
import imgOne from './images/House.png'
import imgTwo from './images/backhouse.png'
import imgThree from './images/poolview.png'
import imgForth from './images/sidepool.png'
import imgFive from './images/sunsetpool.png'
import pfp from './images/pfp.png'
import wifi from './images/WifiBlack.png'
import check from './images/CheckBlack.png'
import cancel from './images/CancelBlack.png'
import BedOne from './images/BedRoomOne.png'
import BedTwo from './images/BedRoomTwo.png'
import BedThree from './images/BedRoomThree.png'
import Ocean from './images/BeachBlack.png'
import Kitchen from './images/KitchenBlack.png'
import workspace from './images/Officeblack.png'
import park from './images/ParkingBlack.png'
import tv from './images/tvblack.png'
import pool from './images/PoolBlack.png'
import { currentIndex, showSlide, prevSlide, nextSlide, } from './Slider.js';
import React, { useEffect, useState, useRef } from "react";
import Calendar from "./Calandar.js";
import GuestCounter from "./Guests.js";
import { Route, useNavigate, Routes } from 'react-router-dom';
import PricingPage from './PricingPage'; 




function App() {

    const sliderRef = useRef(null);
    const [highlight, setHighlight] = useState(false); //Hightlight is used for scroll
    const [checkInDate, setCheckInDate] = useState(() => {
        const saved = localStorage.getItem('checkInDate');
        return saved ? new Date(saved) : null;
    });
    const [checkOutDate, setCheckOutDate] = useState(() => {
        const saved = localStorage.getItem('checkOutDate');
        return saved ? new Date(saved) : null;
    });

    useEffect(() => {
        if (sliderRef.current) {
            showSlide(currentIndex);
        }
    },);

    const calandarRef = useRef(null);
    // const scrollToCalendar = () => {
    //     calandarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    //     setHighlight(true);
    //     setTimeout(() => setHighlight(false), 2000);
    // };
    //  ADD WHEN SCROLL IS FIXED


    const handleDateChange = (newCheckInDate, newCheckOutDate) => {
        if (newCheckInDate) {
            if (!checkOutDate || newCheckInDate <= checkOutDate) {
                setCheckInDate(newCheckInDate);
                localStorage.setItem('checkInDate', newCheckInDate.toISOString());
            } else {
                setCheckInDate(newCheckInDate);
                setCheckOutDate(null); 
                localStorage.setItem('checkInDate', newCheckInDate.toISOString());
                localStorage.removeItem('checkOutDate'); 
            }
        }
        if (newCheckOutDate && newCheckOutDate > checkInDate) { 
            setCheckOutDate(newCheckOutDate);
            localStorage.setItem('checkOutDate', newCheckOutDate.toISOString());
        }
    };

    const [guestCount, setGuestCount] = useState(() => parseInt(localStorage.getItem('guestCount'), 10) || 1);

    const navigate = useNavigate();
    const handleReserveClick = () => {
        navigate('/pricing', {
            state: {
                checkInDate: checkInDate,
                checkOutDate: checkOutDate,
                guestCount: guestCount
            }
        });
    };

    return(
        <>
        <header>
            <div className="headerdiv">
                <h1 className="VacayText"><img src={logo} className="logo" alt="logo"/>VacaySpot</h1>
                <hr className="firstline"/>
            </div>
        </header>
        <Routes>
                <Route path="/" element={
                    <>
        <body>
            <div>
                <h1 className="locname">Vista Hermosa - Pool Amazing View Spacious Rincon</h1>
                <div id="sliderOne" className="slider-container">
                    <div className="slider-wrapper">
                        <div className="slider">
                            <img src={imgOne} className="SliderImg" alt="imageone"/>
                            <img src={imgTwo} className="SliderImg" alt="imagetwo"/>
                            <img src={imgThree} className="SliderImg" alt="imagthree"/>
                            <img src={imgForth} className="SliderImg"  alt="imagefour"/>
                            <img src={imgFive} className="SliderImg" alt="imagefive"/>
                        </div>
                    </div>
                    <button className="prev" onClick={prevSlide}>❮</button>
                    <button className="next" onClick={nextSlide}>❯</button>
                </div>
            </div>
            </body>
            <div className="abouts">
                <h1>Entire home in Guaniquilla, Puerto Rico</h1>
                <h2 className="housedetails">16+ guests, 5 bedrooms, 8 beds 3 baths</h2>
                <hr className="aboutline"/>
                <img src={pfp} className="pfp" alt="profpic"/>
                <h1 className="HostName">Hosted by Vanesa</h1>
                <hr className="aboutline2"/>
                <img src={wifi} className="wifilogo" alt="wifiimg"/>
                <h1 className="wifitext">Great Wifi - 330Mbps</h1>
                <img src={check} className="checkimg" alt="checkimg"/>
                <h1 className="checktext">Self check-in</h1>
                <img src={cancel} className="cancelimg" alt="canelimg"/>
                <h1 className="canceltext">Free cancellation 48 hours</h1>
                <hr className="aboutline3"/>
                <h1 className="sleptxt">Bedrooms</h1>
                <img src={BedOne} className="BedroomOne" alt="bedoneimg"/>
                <img src={BedTwo} className="BedroomTwo" alt="bedtwoimg"/>
                <img src={BedThree} className="BedroomThree" alt="bedthreeimg"/>
                <hr className="aboutline4"/>
                <h1 className="exptxt">What you can expect</h1>
                <div className="containedexp">
                <h2 className="exptxtone">Ocean View</h2>
                <img src={Ocean} className="OceanView" alt="oceanicon"/>
                <h2 className="exptxtone">Kitchen</h2>
                <img src={Kitchen} className="Kitchen" alt="kitchenicon"/>
                <h2 className="exptxtone">Dedicated Workspace</h2>
                <img src={workspace} className="workspace" alt="workicon"/>
                <h2 className="exptxtone">Private Outdoor Pool</h2>
                <img src={pool} className="pool" alt="poolicon"/>
                <h2 className="exptxttwo">Fast Wifi - 330 Mbps</h2>
                <img src={wifi} className="wifi" alt="wifiicon"/>
                <h2 className="exptxttwo">Free Parking</h2>
                <img src={park} className="park" alt="parkicon"/>
                <h2 className="exptxttv">80" HDTV with Netflix</h2>
                <img src={tv} className="tv" alt="tvicon"/>
                </div>
                <div>
</div>
<hr className="calanderline"/>
<div ref={calandarRef} className={highlight ? "highlighted" : ""}>

<Calendar
    setDates={handleDateChange}
    checkInDate={checkInDate} 
    checkOutDate={checkOutDate}
/>


</div>
                </div>
            <div className="reservebox">
                <div className="pricenit">
                    <h1>Price</h1>
                    <h2 className="nit">/Night</h2>
                    <h2 className="scroltocal">(Scroll Down To Find Calander Select)</h2>
                </div>
                <div className="MainBox">
                    <div className="inbox">
                        <h2>CHECK-IN</h2>
                        <h2>{checkInDate ? checkInDate.toLocaleDateString() : 'No date selected'}</h2>
                        {/* <button className="dropres" onClick={scrollToCalendar}><img src={cancel} alt="cancel"/></button> ADD WHEN SCROLL IS FIXED */}
                    </div>
                    <hr className="priceline"/>
                    <div className="outbox">
                        <h2 className="Checkout">CHECKOUT</h2>
                        <h2>{checkOutDate ? checkOutDate.toLocaleDateString() : 'No date selected'}</h2>
                    </div>
                    <div>
                        <h2 className="guests">GUESTS</h2>
                        <GuestCounter guestCount={guestCount} setGuestCount={setGuestCount}/>
                    </div>
                </div>
                <button className="Reservebutton" onClick={handleReserveClick}>Reserve</button>
                <h1 className="dtopay">Directs to Payments</h1>
                <hr className="bottemline"/>
                <h1 className="pbeftax">Price Before Taxes</h1>
            </div>
            </>
            } />
            <Route path="/pricing" element={<PricingPage />} />
        </Routes>
        </>
    )
}

export default App;