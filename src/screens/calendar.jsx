import React, { useState } from "react";
import Header from "../component/header";
import LeftSideBar from "../component/left-sidebar";
import "../css/calendarScreen.css";

const CalendarScreen = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [viewMode, setViewMode] = useState("month"); // month, week, day
    const [showEventModal, setShowEventModal] = useState(false);
    const [eventTitle, setEventTitle] = useState("");
    const [eventTime, setEventTime] = useState("");
    const [events, setEvents] = useState([]);

    const holidays = {
        '1-1': 'New Year',
        '1-26': 'Republic Day',
        '8-15': 'Independence Day',
        '10-2': 'Gandhi Jayanti',
        '12-25': 'Christmas'
    };

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
        const newSelectedDate = new Date(currentYear, currentMonth, day);
        setSelectedDate(newSelectedDate);
        setShowEventModal(true);
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

    const isHoliday = (day) => {
        const holidayKey = `${currentMonth + 1}-${day}`;
        return holidays[holidayKey];
    };

    const isSunday = (dayIndex) => {
        return (firstDayOfMonth + dayIndex) % 7 === 0;
    };

    const hasEvent = (day) => {
        const dateKey = `${currentYear}-${currentMonth + 1}-${day}`;
        return events.some(event => event.date === dateKey);
    };

    const getEventsForDate = (day) => {
        const dateKey = `${currentYear}-${currentMonth + 1}-${day}`;
        return events.filter(event => event.date === dateKey);
    };

    const addEvent = () => {
        if (eventTitle.trim()) {
            const dateKey = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`;
            const newEvent = {
                id: Date.now(),
                title: eventTitle,
                time: eventTime || "All day",
                date: dateKey
            };
            setEvents([...events, newEvent]);
            setEventTitle("");
            setEventTime("");
            setShowEventModal(false);
        }
    };

    const deleteEvent = (eventId) => {
        setEvents(events.filter(event => event.id !== eventId));
    };

    const renderCalendarDays = () => {
        const days = [];
        const totalCells = 42;

        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const holiday = isHoliday(day);
            const sunday = isSunday(day - 1);
            const hasEventOnDay = hasEvent(day);
            const dayEvents = getEventsForDate(day);

            let className = "calendar-day";
            if (isToday(day)) className += " today";
            if (isSelected(day)) className += " selected";
            if (holiday) className += " holiday";
            if (sunday) className += " sunday";
            if (hasEventOnDay) className += " has-event";

            days.push(
                <div
                    key={day}
                    className={className}
                    onClick={() => handleDateClick(day)}
                >
                    <span className="day-number">{day}</span>
                    {holiday && <span className="holiday-badge">🎉</span>}
                    {hasEventOnDay && <span className="event-dot"></span>}
                    {dayEvents.length > 0 && (
                        <div className="event-preview">
                            {dayEvents.slice(0, 2).map(event => (
                                <div key={event.id} className="event-preview-item">
                                    {event.title}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            );
        }

        while (days.length < totalCells) {
            days.push(<div key={`empty-end-${days.length}`} className="calendar-day empty"></div>);
        }

        return days;
    };

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const isSelectedSunday = selectedDate.getDay() === 0;
    const selectedDateHoliday = isHoliday(selectedDate.getDate());

    return (
        <div>
            <Header />
            <div className="wrapper">
                <LeftSideBar />
                <div className="content">
                    <div className="calendar-container">
                        {/* Calendar Header */}
                        <div className="calendar-header">
                            <div className="nav-controls">
                                <button onClick={prevMonth} className="nav-button">
                                    <i className="fas fa-chevron-left"></i>
                                </button>
                                <button onClick={nextMonth} className="nav-button">
                                    <i className="fas fa-chevron-right"></i>
                                </button>
                            </div>
                            <div className="month-year">
                                <h2>{monthNames[currentMonth]} {currentYear}</h2>
                                <button onClick={goToToday} className="today-button">Today</button>
                            </div>
                            <div className="view-controls">
                                <button 
                                    className={`view-btn ${viewMode === 'month' ? 'active' : ''}`}
                                    onClick={() => setViewMode('month')}
                                >
                                    Month
                                </button>
                                <button 
                                    className={`view-btn ${viewMode === 'week' ? 'active' : ''}`}
                                    onClick={() => setViewMode('week')}
                                >
                                    Week
                                </button>
                                <button 
                                    className={`view-btn ${viewMode === 'day' ? 'active' : ''}`}
                                    onClick={() => setViewMode('day')}
                                >
                                    Day
                                </button>
                            </div>
                        </div>

                        {/* Calendar Grid */}
                        <div className="calendar-grid">
                            {dayNames.map(day => (
                                <div key={day} className={`day-header ${day === 'Sun' ? 'sunday-header' : ''}`}>
                                    {day}
                                </div>
                            ))}
                            {renderCalendarDays()}
                        </div>

                        {/* Selected Date Info */}
                        <div className={`selected-date-info ${isSelectedSunday ? 'sunday' : ''}`}>
                            <div className="selected-date-header">
                                <span className="selected-date-icon">📅</span>
                                <span className="selected-date-text">
                                    {selectedDate.toDateString()}
                                </span>
                                {isSelectedSunday && <span className="holiday-tag">🎉 Sunday Funday!</span>}
                                {selectedDateHoliday && (
                                    <span className="holiday-tag">
                                        🎊 {selectedDateHoliday}
                                    </span>
                                )}
                            </div>
                            <button 
                                className="add-event-btn"
                                onClick={() => setShowEventModal(true)}
                            >
                                + Add Event
                            </button>
                        </div>

                        {/* Events List */}
                        {getEventsForDate(selectedDate.getDate()).length > 0 && (
                            <div className="events-list">
                                <h3>📋 Events for {selectedDate.toDateString()}</h3>
                                {getEventsForDate(selectedDate.getDate()).map(event => (
                                    <div key={event.id} className="event-item">
                                        <div className="event-info">
                                            <span className="event-title">{event.title}</span>
                                            <span className="event-time">⏰ {event.time}</span>
                                        </div>
                                        <button 
                                            className="delete-event-btn"
                                            onClick={() => deleteEvent(event.id)}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Upcoming Events Section */}
                        <div className="upcoming-events">
                            <h3>⭐ Upcoming Events</h3>
                            <div className="upcoming-list">
                                {events.slice(0, 5).map(event => (
                                    <div key={event.id} className="upcoming-item">
                                        <div className="upcoming-date">
                                            {new Date(event.date).toLocaleDateString()}
                                        </div>
                                        <div className="upcoming-title">{event.title}</div>
                                    </div>
                                ))}
                                {events.length === 0 && (
                                    <div className="no-events">No upcoming events</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Event Modal */}
            {showEventModal && (
                <div className="modal-overlay" onClick={() => setShowEventModal(false)}>
                    <div className="event-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Add Event for {selectedDate.toDateString()}</h2>
                            <button className="close-modal" onClick={() => setShowEventModal(false)}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Event Title</label>
                                <input 
                                    type="text" 
                                    placeholder="Enter event title"
                                    value={eventTitle}
                                    onChange={(e) => setEventTitle(e.target.value)}
                                    autoFocus
                                />
                            </div>
                            <div className="form-group">
                                <label>Time</label>
                                <input 
                                    type="time" 
                                    value={eventTime}
                                    onChange={(e) => setEventTime(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="cancel-btn" onClick={() => setShowEventModal(false)}>Cancel</button>
                            <button className="save-btn" onClick={addEvent}>Add Event</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CalendarScreen;