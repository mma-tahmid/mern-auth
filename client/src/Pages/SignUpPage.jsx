import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios'

const SignUpPage = () => {

    const navigate = useNavigate()

    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const [loading, setLoading] = useState(false)

    // form submit function 
    const handleSubmit = async (event) => {

        event.preventDefault()

        try {

            setLoading(true)

            const response = await axios.post("http://localhost:8000/api/v5/user-auth/registration", { userName, email, password })

            if (response.data.success) {

                toast.success(response.data.message, { position: "top-right" })

                // After Submit the form all input field will be empty
                setUserName("")
                setEmail("")
                setPassword("")

                navigate('/sign-in')
            }
            else {
                toast.error(response.data.message, { position: "top-right" })  // error of input field validation & existing email & existing user name 
            }

            setLoading(false)

        }

        catch (error) {
            //console.log(error)
            setLoading(false)
            toast.error("Some thing went Wrong", { position: "top-right" })
        }

    }


    return (

        <>
            <div className='p-3 max-w-lg mx-auto'>
                {/* input field max width=512px (max-w-lg) */}
                <h1 className='text-3xl text-center font-semibold my-7 '> Sign Up </h1>

                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

                    <input className='bg-slate-100 p-3 rounded-lg' type="text" placeholder='Enter the user name'
                        value={userName}
                        onChange={(event) => setUserName(event.target.value)}

                    />

                    <input className='bg-slate-100 p-3 rounded-lg' type="email" placeholder='Enter the  email'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />

                    <input className='bg-slate-100 p-3 rounded-lg' type="password" placeholder='Enter the Password'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />

                    <button disabled={loading} type="submit" className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>

                        {loading ? "Loading..." : "Sign up"} </button>

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