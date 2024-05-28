import './App.css';
import './App';
import './Calandar'
import poolview from './images/poolview2.png'
import { useLocation, useNavigate } from 'react-router-dom';

function PricingPage() {

    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

    const location = useLocation();
    const navigate = useNavigate();
    const { checkInDate, checkOutDate} = location.state ?? {};

    const formatDate = (date) => {
        const d = new Date(date);
        return `${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;
    };
    
    const startDate = checkInDate ? new Date(checkInDate) : new Date();
    const endDate = checkOutDate ? new Date(checkOutDate) : new Date();
    const numberOfGuests = parseInt(localStorage.getItem('guestCount'), 10) || 1;
    const diffTime = checkInDate && checkOutDate ? Math.abs(endDate - startDate) : 0;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const nightlyRate = 305;
    const cleaningFee = 200;
    const totalPrice = (nightlyRate * diffDays) + cleaningFee;

    const goBack = () => {
        navigate(-1); 
    };

    return(
<>
<div className='PriceContained'>
            <div className='TripInfo'>
                <button className='backbut' onClick={goBack}>❮ Back</button>
                <h2 className='trippinfo'>Trip Info:</h2>
                <h2 className='DateCheck'>Dates</h2>
                <button className='editbutone' onClick={goBack}>Edit</button>
                <h2 className='checkinfo'>CheckIn - CheckOut: {checkInDate && checkOutDate ? `${formatDate(checkInDate)} - ${formatDate(checkOutDate)}` : 'Not Set'}</h2>
                <h2 className='guestcheck'>Guests</h2>
                <button className='editbuttwo' onClick={goBack}>Edit</button>
                <h2 className='guestinfo'>{numberOfGuests } Guests</h2>
                <hr className='linetrip'/>
                <input className='phonenum' type="tel" id="phoneInput" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="Phone Number" required/>
                <hr className='orline'/>
                <h3 className='or'>or</h3>
                <hr className='orlinetwo'/>
                <input className='emailnum' type="email" id="email" name="email" placeholder="Email"></input>
                <button className='continuebut'>Continue</button>

            </div>
            <div className='priceinfo'>
                <img className='poolview' src={poolview} alt='smolimg'/>
                <h2 className='Title'>Vista Hermosa - Pool Amazing View, Spacious Rincon</h2>
                <hr className='line'/>
                <h1 className='indet'>Price Details</h1>
                <h2 className='dayspaid'>$305 x {diffDays} Nights = ${305 * diffDays}</h2>
                <h2 className='cleanfee'>Cleaning fee = $200</h2>
                <h2 className='taxes'>Taxes = (Depends on Payment Method)</h2>
                <hr className='line'/>
                <h2 className='totaled'>Total (USD) = ${totalPrice} </h2>
                <h2 className='nottax'>Not Including Taxes</h2>
            </div>
</div>
</>
    )
}

export default PricingPage;