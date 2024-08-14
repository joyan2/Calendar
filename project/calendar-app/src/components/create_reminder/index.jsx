import React, { useState } from 'react'
import { useAuth } from '../../contexts/authContext'
import { useNavigate } from 'react-router-dom'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// This will handle the form with the new event data submitted by the user
const FormHandler = (form) => {
    const { currentUser } = useAuth()
    var email = currentUser.displayName ? currentUser.displayName : currentUser.email

    const navigate = useNavigate()
    navigate('/home')
}

const CreateReminder = () => {
    const navigate = useNavigate()
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    return (
        <div className='px-5'>
            <main className="w-full flex self-center place-content-center py-20">
                <div className="w-2/3 text-gray-600 space-y-5 p-4 shadow-xl border rounded-xl">
                    <div className="text-center">
                        <div className="mt-2">
                            <h3 className="text-gray-800 text-xl font-semibold sm:text-2xl">New Reminder</h3>
                        </div>
                    </div>
                    <form action={FormHandler} className="justify-center">
                        <div>
                            <label className="text-sm text-gray-600 font-bold"> Reminder Name </label>
                            <input name="event_name" type="event_name" autoComplete='Default Name' required className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"/>
                        </div>
                        <div className='flex justify-left'>
                            <div className="py-5 flex flex-col">
                                <label className="text-sm text-gray-600 font-bold"> Start Time </label>
                                <DatePicker className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300" selected={startDate} showTimeSelect dateFormat="MMMM d, yyyy h:mm aa" onChange={(date) => setStartDate(date)} />
                            </div>
                            <div className="py-5 px-5 flex flex-col">
                                <label className="text-sm text-gray-600 font-bold"> End Time </label>
                                <DatePicker className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300" selected={endDate} showTimeSelect dateFormat="MMMM d, yyyy h:mm aa" onChange={(date) => setEndDate(date)} />
                            </div>
                            <div className="py-5 px-5">
                                <label className="text-sm text-gray-600 font-bold"> Priority </label>
                                <select name="priority" className="w-full h-10 mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300">
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </div>
                            <div className="py-5 px-5">
                                <label className="text-sm text-gray-600 font-bold"> Category </label>
                                <select name="category" className="w-full h-10 mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300">
                                    <option value="Personal">Personal</option>
                                    <option value="School">School</option>
                                    <option value="Work">Work</option>
                                </select>
                            </div>
                        </div>
                        <div className="py-1">
                            <label className="text-sm text-gray-600 font-bold"> Description </label>
                            <input name="description" type="description" autoComplete='No Description' required className="w-full h-40 mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"/>
                        </div>
                        <div className='justify-center flex flex-row gap-x-5 py-5'>
                            <button type="submit" className={`width-40 px-4 py-2 text-white font-medium rounded-lg bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300 padding`}> Create Reminder </button>
                            <button onClick={() => {  navigate('/home')  }} className={`width-40 px-4 py-2 text-white font-medium rounded-lg bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300`} > Cancel </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default CreateReminder