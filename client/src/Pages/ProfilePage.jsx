import React from 'react';
import { useSelector } from 'react-redux';

const ProfilePage = () => {

    const { currentUser } = useSelector((state) => state.user)

    return (




        <>
            <h1 className='text-3xl font-semibold text-center my-7 '> profile </h1>

            <form className='flex flex-col gap-4'>

                <img className='h-24 w-24 self-center cursor-pointer rounded-full object-cover' src={currentUser.profilePicture} alt="profile-image" />

                <input defaultValue={currentUser.userName} className='bg-slate-100 rounded-lg p-3 self-center w-96' type="text" placeholder='Username' />

                <input defaultValue={currentUser.email} className='bg-slate-100 rounded-lg p-3 self-center w-96' type="email" placeholder='Email' />

                <input className='bg-slate-100 rounded-lg p-3 self-center w-96' type="password" placeholder='Password' />

                <button className='self-center w-96  bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-85 '>Update</button>
            </form>

            <div className='flex flex-col mt-5'>
                <div className='self-center w-96'>
                    <div className='flex justify-between  flex-row '>
                        <span className='text-red-700 cursor-pointer '>
                            Delete Account
                        </span>

                        <span className='text-red-700 cursor-pointer '>
                            sign out
                        </span>
                    </div>
                </div>
            </div>


        </>
    );
};

export default ProfilePage;