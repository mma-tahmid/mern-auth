import React from 'react';
import { Link } from 'react-router-dom';

const SignUpPage = () => {

    return (

        <>
            <div className='p-3 max-w-lg mx-auto'>
                <h1 className='text-3xl text-center font-semibold my-7 '> Sign Up </h1>

                <form className='flex flex-col gap-4'>

                    <input className='bg-slate-100 p-3 rounded-lg' type="text" placeholder='Enter the user name' />

                    <input className='bg-slate-100 p-3 rounded-lg' type="email" placeholder='Enter the  email' />

                    <input className='bg-slate-100 p-3 rounded-lg' type="password" placeholder='Enter the Password' />

                    <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'> Sign up </button>



                    {/* <input type="email" className="form-control" id="exampleInputEmail" placeholder='Enter your Email' required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
    /> */}
                </form>

                <div className='flex gap-2 mt-5'>
                    <p>Have an Account? </p>
                    <Link to='/sign-in'>
                        <span className='text-blue-500'> Sign in </span>
                    </Link>
                </div>


            </div>
        </>
    );
};

export default SignUpPage;