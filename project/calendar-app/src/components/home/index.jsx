import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import { Calendar, momentLocalizer  } from 'react-big-calendar';
import moment from 'moment';
import Moment from 'react-moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';


import { useTheme } from '../../ThemeContext';
import EventModal from '../../EventModal';  // Adjust the path as necessary

const localizer = momentLocalizer(moment)
const DnDCalendar = withDragAndDrop(Calendar);


const handleSelectedEvent = (event) => {
    //Get matching event from tempEvents
    const selectedEvent = tempEvents.find((tempEvents) => tempEvents.id === event.id); 
    alert(selectedEvent.details);
}

const tempEvents = [
    {   
        id: 123112312,
        title: 'Event 1',   
        details: 'More notes for the event',    
        start: new Date(),
        end: <Moment add={{ hours: 1 }}>{new Date()}</Moment>,
    }
  ];

const Home = () => {
    // EVENT MODAL COFING
    const [events, setEvents] = useState(tempEvents);  // Assuming tempEvents is your events data
    const [modalIsOpen, setIsOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const openModal = (event) => {
        setIsOpen(true);
        setSelectedEvent(event);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedEvent(null);
    };

    const saveEvent = (updatedEvent) => {
        const updatedEvents = events.map(event => 
            event.id === updatedEvent.id ? updatedEvent : event
        );
        setEvents(updatedEvents);
        closeModal();
    };

    const deleteEvent = (id) => {
        const updatedEvents = events.filter(event => event.id !== id);
        setEvents(updatedEvents);
        closeModal();
    };

    const onEventDrop = ({ event, start, end }) => {
        const idx = events.findIndex(evt => evt.id === event.id);
        const updatedEvent = { ...event, start, end };
        const newEvents = [...events];
        newEvents.splice(idx, 1, updatedEvent);
        setEvents(newEvents);
    };

    const onEventResize = ({ event, start, end }) => {
        const idx = events.findIndex(evt => evt.id === event.id);
        const updatedEvent = { ...event, start, end };
        const newEvents = [...events];
        newEvents.splice(idx, 1, updatedEvent);
        setEvents(newEvents);
    };


    const { theme, toggleTheme } = useTheme();

    const navigate = useNavigate();

    const [filterKeyword, setFilterKeyword] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date());  // State to hold the current time
    
    useEffect(() => {
        const timer = currentTime && setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);  // Update every minute instead of every second
    
        return () => timer && clearInterval(timer);
    }, [currentTime]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());  // Update current time every second
        }, 1000);

        return () => clearInterval(timer);  // Clear interval on component unmount
    }, []);

    const filteredEvents = tempEvents.filter((event) =>
        event.title.toLowerCase().includes(filterKeyword.toLowerCase()) ||
        event.details.toLowerCase().includes(filterKeyword.toLowerCase())
    );    

    return (
    <div className={`px-5 ${theme}`}>
        <div className='pt-32 pb-10 flex flex-row justify-center items-start'>
            <div className="mr-5"> 
                <input 
                    type="text" 
                    placeholder="Filter events"
                    className="mb-4 p-2 border rounded"
                    value={filterKeyword}
                    onChange={(e) => setFilterKeyword(e.target.value)} 
                />
                <button 
                    onClick={toggleTheme}
                    className="p-2 border rounded">
                    {theme === 'dark' ? 'Switch to Light Mode' : 'Change Theme'}
                </button>
                <h2 style={{ marginTop: '20px' }}>Current Time: {currentTime.toLocaleTimeString()}</h2>
            </div>
                <DnDCalendar
                    localizer={localizer}
                    events={filteredEvents}
                    onEventDrop={onEventDrop}
                    onEventResize={onEventResize}
                    resizable
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 600, width: '200%' }}
                    onSelectEvent={openModal}
                    />
                <EventModal
                    modalIsOpen={modalIsOpen}
                    closeModal={closeModal}
                    eventDetails={selectedEvent}
                    saveEvent={saveEvent}
                    deleteEvent={deleteEvent}
                />
            </div>
            <div className='flex flex-row gap-x-5 justify-center'>
                <button type="submit" 
                        onClick={() => { navigate('/create_event') }} 
                        className={`width-40 px-4 py-2 text-white font-medium rounded-lg bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300`} 
                > Create New Event </button>
                <button 
                        type="submit" 
                        onClick={() => { navigate('/create_reminder') }} 
                        className={`width-40 px-4 py-2 text-white font-medium rounded-lg bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300`} 
                > Create New Reminder </button>
            </div>
        </div>
    )
}

export default Home