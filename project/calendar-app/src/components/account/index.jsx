import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import momentTimezone from 'moment-timezone'; // Import moment-timezone
import "react-big-calendar/lib/css/react-big-calendar.css";
import TimezoneSelect from 'react-timezone-select';


const CustomDropdown = ({ currentTimezone, onChangeTimezone }) => {
    const [isVisible, setIsVisible] = useState(false);
    const dropdownRef = useRef(null);
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsVisible(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef]);
    
    return (
      <div ref={dropdownRef} className="" style={{ position: 'relative', display: 'inline-block' }}>
        <button onClick={() => setIsVisible(!isVisible)} className="dropdown-container w-full h-10 mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300">
          Select Timezone
        </button>
        {isVisible && (
          <div className="dropdown-menu" style={{ position: 'absolute', top: '100%', left: 0, backgroundColor: '#fff', boxShadow: '0 2px 5px rgba(0,0,0,0.2)', zIndex: 1000, borderRadius: '5px' }}>
            {momentTimezone.tz.names().map(tz => (
              <div key={tz} onClick={() => { onChangeTimezone(tz); setIsVisible(false); }} className="dropdown-item" style={{ padding: '10px', cursor: 'pointer', hover: {} }}>
                {tz}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

// This will handle the form with the new event data submitted by the user
function FormHandler(formData) {
    // const { currentUser } = useAuth()
    // var email = currentUser.displayName ? currentUser.displayName : currentUser.email
    alert(`You searched for`);
    const navigate = useNavigate()
    navigate('/home')
}

const Account = () => {
    const navigate = useNavigate()
    const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
    const [selectedTimezone, setSelectedTimezone] = useState('');

    return (
            <div className='px-5'>
                <main className="w-full flex self-center place-content-center py-20">
                    <div className="w-2/3 text-gray-600 space-y-5 p-4 shadow-xl border rounded-xl">
                        <div className="text-center">
                            <div className="mt-2">
                                <h3 className="text-gray-800 text-xl font-semibold sm:text-2xl">Account Details</h3>
                            </div>
                        </div>
                    <form action={FormHandler} className="justify-center">
                        <div>
                            <label className="text-sm text-gray-600 font-bold"> Username </label>
                            <input name="username" type="username" autoComplete='Default Name' required className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"/>
                        </div>
                        <div className='pt-5'>
                            <label className="text-sm text-gray-600 font-bold"> Phone Number </label>
                            <input name="phone_number" type="phone_number" autoComplete='Default Number' required className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"/>
                        </div>
                        <div className='flex justify-left'>
                            <div className="flex flex-col place-content-center py-5">
                                <label className="text-sm text-gray-600 font-bold"> Timezone </label>
                                <TimezoneSelect value={selectedTimezone} onChange={setSelectedTimezone} className="w-80 h-10 mt-2 py-1 "/>
                            </div>
                            <div className="py-5 px-5">
                                <label className="text-sm text-gray-600 font-bold"> UI Theme </label>
                                <select name="theme" className="w-full h-10 mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300">
                                    <option value="Light">Light</option>
                                    <option value="Dark">Dark</option>
                                </select>
                            </div>
                        </div>
                        <div className='justify-center flex flex-row gap-x-5 py-5'>
                            <button type="submit" className={`width-40 px-4 py-2 text-white font-medium rounded-lg bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300 padding`}> Save Changes </button>
                            <button onClick={() => {  navigate('/home')  }} className={`width-40 px-4 py-2 text-white font-medium rounded-lg bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300`} > Cancel </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default Account