import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux"
import { signInFailure, signInStart, signInSuccess } from '../redux/slice/userSlice';
import OAuth from '../Components/OAuth';
//import { useCookies } from 'react-cookie';

const SignInPage = () => {


    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const { loading, error } = useSelector((state) => state.user)

    // form submit function 

    // const [cookies, setCookie] = useCookies(['access_token']); // Using useCookies to manage cookies

    const handleSubmit = async (event) => {

        event.preventDefault()


        try {

            dispatch(signInStart())

            const response = await axios.post("/api/v5/user-auth/login", { email, password })



            if (response.data.success) {

                dispatch(signInSuccess(response.data.output)) // data loaded in redux dev tool
                toast.success(response.data.message, { position: "top-right" })

                // After Submit the form all input field will be empty
                setEmail("")
                setPassword("")

                navigate('/')
            }
            else {
                dispatch(signInFailure(response.data.message));
                toast.error(response.data.message, { position: "top-right" })  // error of input field validation & existing email & existing user name 
            }



        }

        catch (error) {
            //console.log(error)
            dispatch(signInFailure(error.message));
            toast.error("Some thing went Wrong", { position: "top-right" })
        }

    }

    return (

        <>

            <div className='p-3 max-w-lg mx-auto'>
                {/* input field max width=512px (max-w-lg) */}
                <h1 className='text-3xl text-center font-semibold my-7 '> Sign In </h1>

                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

                    <input className='bg-slate-100 p-3 rounded-lg' type="email" placeholder='Enter the  email'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />

                    <input className='bg-slate-100 p-3 rounded-lg' type="password" placeholder='Enter the Password'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />

                    <button disabled={loading} type="submit" className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>

                        {loading ? "Loading..." : "Sign in"} </button>

                    <OAuth />

                </form>


                <div className='flex gap-2 mt-5'>
                    <p> Do not Have an Account? </p>
                    <Link to='/sign-up'>
                        <span className='text-blue-500'> Sign up </span>
                    </Link>
                </div>


            </div>

        </>
    );
};

export default SignInPage;