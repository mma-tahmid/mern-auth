import React from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from '../firebase/firebaseConfig';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/slice/userSlice';
import { useNavigate } from 'react-router-dom'



const OAuth = () => {


    const navigate = useNavigate()

    const dispatch = useDispatch();

    const handleGoogleClick = async () => {

        try {

            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider)

            const response = await axios.post("/api/v5/user-auth/google", {
                names: result.user.displayName, // this user comes from google (console)
                emails: result.user.email,
                photo: result.user.photoURL
            })

            //const data = await response.json();
            // console.log(response.data.output)
            dispatch(signInSuccess(response.data.output))
            navigate('/')

        }

        catch (error) {
            console.log("could not login with google", error)

        }
    }


    return (

        <>
            <button onClick={handleGoogleClick} type='button' className='bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95'>Continue with google</button>
        </>
    );
};

export default OAuth;