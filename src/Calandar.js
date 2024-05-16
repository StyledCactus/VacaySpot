import React, { useState, useEffect } from 'react';

const monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"];
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function Calendar({ setDates, checkInDate, checkOutDate }) {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [daysArray, setDaysArray] = useState([]);

    useEffect(() => {
        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        const days = Array.from({ length: lastDay.getDate() }, (_, i) => ({
            day: i + 1,
            date: new Date(currentYear, currentMonth, i + 1)
        }));
        const leadingDays = Array(firstDay.getDay()).fill({ day: null, date: null });
        setDaysArray([...leadingDays, ...days]);
    }, [currentMonth, currentYear]);

    const changeMonth = (direction) => {
        setCurrentMonth(prevMonth => {
            const newMonth = (prevMonth + direction + 12) % 12;
            if ((direction === -1 && newMonth > prevMonth) || (direction === 1 && newMonth < prevMonth)) {
                setCurrentYear(prevYear => prevYear + direction);
            }
            return newMonth;
        });
    };

    const handleDateSelect = (date) => {
        if (!checkInDate || (date > checkInDate && !checkOutDate)) {
            setDates(checkInDate || date, date > checkInDate ? date : null);
        } else {
            setDates(date, null);
        }
    };

    const formatDate = (date) => date ? `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}` : 'None';

    return (
        <div className="date-picker">
            <div className="month-navigation">
                <button className="prev-month" onClick={() => changeMonth(-1)}>&lt;</button>
                <span className="month-year">{monthNames[currentMonth]} {currentYear}</span>
                <button className="next-month" onClick={() => changeMonth(1)}>&gt;</button>
            </div>
            <div className="calendar-days">
                {weekDays.map(day => <div key={day}>{day}</div>)}
            </div>
            <div className="date-grid">
                {daysArray.map((dayInfo, index) => (
                    <div key={index}
                         className={`date-item ${checkInDate && dayInfo.date && dayInfo.date.getTime() === checkInDate.getTime() ? 'selected' : ''}
                                     ${checkOutDate && dayInfo.date && dayInfo.date.getTime() === checkOutDate.getTime() ? 'selected' : ''}`}
                         onClick={() => dayInfo.date && handleDateSelect(dayInfo.date)}>
                        {dayInfo.day || ''}
                    </div>
                ))}
            </div>
            <div className="chosen-date-display">
                <h1>Check-In Date: {formatDate(checkInDate)}</h1>
                <h1>Check-Out Date: {formatDate(checkOutDate)}</h1>
            </div>
        </div>
    );
}

export default Calendar;
