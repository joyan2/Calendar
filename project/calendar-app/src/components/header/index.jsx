import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import { doSignOut } from '../../firebase/auth'

const Header = () => {
    const navigate = useNavigate()
    const { currentUser } = useAuth()

    return (
        <nav className='flex flex-row gap-x-2 w-full z-20 fixed justify-between top-0 left-0 h-12 border-b place-content-left items-center bg-gray-200'>
            {
                currentUser
                    ?
                    <>
                        <h1 className='text-gray-800 text-xl font-semibold sm:text-3x2 px-5'>CS 222 Calendar App</h1>
                        <div className='place-content-left flex flex-row gap-x-2'>
                            <button onClick={() => { navigate('/account') }} className='text-gray-800 text-xl font-semibold sm:text-3x2 underline pr-5'>Account Settings</button>
                            <button onClick={() => { doSignOut().then(() => { navigate('/login') }) }} className='text-gray-800 text-xl font-semibold sm:text-3x2 underline pr-5'>Logout</button>
                        </div>
                    </>
                    :
                    <>
                        <h1 className='text-gray-800 text-xl font-semibold sm:text-3x2 px-5'>CS 222 Calendar App</h1>
                    </>
            }
        </nav>
    )
}

export default Header
