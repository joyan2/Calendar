import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import moment from 'moment';

// Updated styles for the modal
const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '800px',
    maxWidth: '1000px', // Adjust as needed
    background: '#fff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    border: 'none',
    zIndex: 1001,
  },
};

Modal.setAppElement('#root');

function EventModal({ modalIsOpen, closeModal, eventDetails, saveEvent, deleteEvent }) {
  const [event, setEvent] = useState(eventDetails || {});

  useEffect(() => {
    setEvent(eventDetails || {});  // Update the event if eventDetails changes
  }, [eventDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Inline styles for elements
  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const inputStyle = {
    margin: '5px 0 15px 0',
    padding: '10px',
  };

  const buttonStyle = {
    margin: '5px 5px 5px 0',
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
  };

  const buttonGroupStyle = {
    display: 'flex',
    justifyContent: 'space-evenly',
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Edit Calendar Event"
    >
      <h2 className="text-center font-bold">Edit Calendar Event</h2>
      <form style={formStyle}>
        <label className="px-1 py-2">
          <h2 className="font-bold">
            Title:
          </h2>
          <input
            className="w-full mt-2 px-3 py-2 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
            name="title"
            value={event.title || ''}
            onChange={handleInputChange}
            placeholder="Title"
          />
        </label>
        <label className="px-1 py-2">
          <h2 className="font-bold">
            Details:
          </h2>
          <input
            className="w-full mt-2 px-3 py-2 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
            type="text"
            name="details"
            value={event.details || ''}
            onChange={handleInputChange}
            placeholder="Details"
          />
        </label>
        <label className="px-1 pt-2 flex flex-col">
          <h2 className="font-bold">
            Start Time:
          </h2>
          <input
            style={inputStyle}
            type="datetime-local"
            name="start"
            value={moment(event.start).format('YYYY-MM-DDTHH:mm') || ''}
            onChange={handleInputChange}
          />
        </label>
        <label className="px-1 pb-1 flex flex-col">
          <h2 className="font-bold">
            End Time:
          </h2>
          <input
            style={inputStyle}
            type="datetime-local"
            name="end"
            value={moment(event.end).format('YYYY-MM-DDTHH:mm') || ''}
            onChange={handleInputChange}
          />
        </label>
        <div style={buttonGroupStyle}>
          <button className={`width-40 px-4 py-2 text-white font-medium rounded-lg bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300`} type="button" onClick={() => saveEvent(event)}>Save</button>
          <button className={`width-40 px-4 py-2 text-white font-medium rounded-lg bg-red-600 hover:bg-red-700 hover:shadow-xl transition duration-300`} type="button" onClick={() => deleteEvent(event.id)}>Delete</button>
          <button className={`width-40 px-4 py-2 text-white font-medium rounded-lg bg-neutral-600 hover:bg-neutral-700 hover:shadow-xl transition duration-300`} type="button" onClick={closeModal}>Cancel</button>
        </div>
      </form>
    </Modal>
  );
}

export default EventModal;
