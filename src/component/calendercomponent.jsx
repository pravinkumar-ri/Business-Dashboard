import React, { useState } from "react";

import "../css/calendarComponent.css";

const CalendarComponent = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const prevMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    };

    const goToToday = () => {
        setCurrentDate(new Date());
        setSelectedDate(new Date());
    };

    const handleDateClick = (day) => {
        setSelectedDate(new Date(currentYear, currentMonth, day));
    };

    const isToday = (day) => {
        const today = new Date();
        return (
            day === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear()
        );
    };

    const isSelected = (day) => {
        return (
            day === selectedDate.getDate() &&
            currentMonth === selectedDate.getMonth() &&
            currentYear === selectedDate.getFullYear()
        );
    };

    const renderCalendarDays = () => {
        const days = [];
        const totalCells = 42;

        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="calendar-day-1 empty"></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            days.push(
                <div
                    key={day}
                    className={`calendar-day-1 ${isToday(day) ? 'today' : ''} ${isSelected(day) ? 'selected' : ''}`}
                    onClick={() => handleDateClick(day)}
                >
                    {day}
                </div>
            );
        }

        while (days.length < totalCells) {
            days.push(<div key={`empty-end-${days.length}`} className="calendar-day-1 empty"></div>);
        }

        return days;
    };

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div>
            <div className="calendar-container-1">
                <div className="calendar-header-1">
                    <button onClick={prevMonth} className="nav-button">
                        <i className="fas fa-chevron-left"></i>
                    </button>

                    <div className="month-year">
                        <h2>{monthNames[currentMonth]} {currentYear}</h2>
                        <button onClick={goToToday} className="today-button">Today</button>
                    </div>

                    <button onClick={nextMonth} className="nav-button">
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </div>

                <div className="calendar-grid">
                    {dayNames.map(day => (
                        <div key={day} className="day-header-1">{day}</div>
                    ))}

                    {renderCalendarDays()}
                </div>
            </div>
        </div>
    )
}

export default CalendarComponent;