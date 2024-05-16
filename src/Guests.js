import React, { useState, useEffect } from 'react';

function GuestCounter() {

    

    const [guestCount, setGuestCount] = useState(() => {
        return parseInt(localStorage.getItem('guestCount'), 10) || 1;
    });

    useEffect(() => {
        localStorage.setItem('guestCount', guestCount);
    }, [guestCount]);

    const incrementCount = () => setGuestCount(prevCount => prevCount + 1);
    const decrementCount = () => setGuestCount(prevCount => Math.max(1, prevCount - 1));

    return (
        <div className='CounterContained'>
            <h2 className='Number'> {guestCount}</h2>
            <button className='left' onClick={decrementCount}><h1 className='minus'>-</h1></button>
            <button className='right' onClick={incrementCount}><h1 className='plus'>+</h1></button>
        </div>
    );
}

export default GuestCounter;
