import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from '../firebase/firebaseConfig';
import axios from 'axios';
import { DeleteUserFailure, DeleteUserStart, DeleteUserSuccess, SignOut, updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/slice/userSlice';
import toast from 'react-hot-toast';


const ProfilePage = () => {

    const { currentUser, loading } = useSelector((state) => state.user)

    const fileRef = useRef(null)
    const [image, setImage] = useState(undefined)
    const [imagePercent, setImagePercent] = useState(0)
    const [imageError, setImageError] = useState(false);
    const [formData, setFormData] = useState({})
    //console.log(formData) 



    useEffect(() => {
        if (image) {
            handleFileUpload(image)
        }
    }, [image])





    const handleFileUpload = (image) => {
        const storages = getStorage(app)
        const fileName = new Date().getTime() + image.name;
        const storageRef = ref(storages, fileName)



        let uploadTask = uploadBytesResumable(storageRef, image);
        //const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
            'state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                //console.log(`Upload is ${progress} % done`)
                setImagePercent(Math.round(progress))
            },


            (error) => {
                setImageError(true)
            },

            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                    setFormData({ ...formData, profilePicture: downloadUrl })
                })
            }
        )
    }


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value }) // this id comes from input field id
    }

    //console.log(formData)

    const dispatch = useDispatch();





    const handleSubmit = async (e) => {
        e.preventDefault();

        //const token = useCookies.get('access_token');


        try {

            dispatch(updateUserStart())

            //const token = cookies.access_token;

            const response = await axios.post(`/api/v5/user-auth/update-user/${currentUser._id}`, formData)


            if (response.data.success) {

                //dispatch(updateUserSuccess(response.data.output)) // data loaded in redux dev tool
                dispatch(updateUserSuccess(response.data.output)) // data loaded in redux dev tool
                toast.success(response.data.message, { position: "top-right" })
            }

            else {
                dispatch(updateUserFailure(response.data.message));
                toast.error(response.data.message, { position: "top-right" })  // error of input field validation & existing email & existing user name 
            }

        }

        catch (error) {
            //console.log(error)
            dispatch(updateUserFailure(error.message));
            //toast.error("Some thing went Wrong", { position: "top-right" })
            toast.error(error.message, { position: "top-right" })
        }

    }



    const handleDeleteAccount = async () => {

        try {
            dispatch(DeleteUserStart())
            const response = await axios.delete(`/api/v5/user-auth/delete-user/${currentUser._id}`)

            if (response.data.success) {
                dispatch(DeleteUserSuccess(response.data.message))
                toast.success(response.data.message, { position: "top-right" })
            }

            else {
                dispatch(DeleteUserFailure(response.data.message));
                toast.error(response.data.message, { position: "top-right" })
            }
        }

        catch (error) {
            dispatch(DeleteUserFailure(error.message));
            //toast.error("Some thing went Wrong", { position: "top-right" })
            toast.error(error.message, { position: "top-right" })
        }
    }



    const handleSignOut = async () => {

        try {

            const response = await axios.get("/api/v5/user-auth/signout")
            dispatch(SignOut())
            toast.success(response.data.message, { position: "top-right" })
        }
        catch (error) {
            console.log(error)
        }

    }

    return (


        //Firebase storage Rules
        //     allow read,
        //         allow write: if
        //   request.resource.size < 2 * 1024 * 1024 &&
        //             request.resource.contentType.matches('image/.*')

        <>
            <h1 className='text-3xl font-semibold text-center my-7 '> profile </h1>

            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

                <input type="file" ref={fileRef} hidden accept='image/*'

                    onChange={(event) => setImage(event.target.files[0])}
                />

                <img className='h-24 w-24 self-center cursor-pointer rounded-full object-cover' src={formData.profilePicture || currentUser.profilePicture} alt="profile-image"

                    onClick={() => fileRef.current.click()}
                />

                <p className='text-sm self-center'>
                    {
                        imageError ? (<span className='text-red-700'> Error Uploading image</span>) : imagePercent > 0 && imagePercent < 100 ? (<span className='text-slate-700'> {`Uploading ${imagePercent} % `}</span>) : imagePercent === 100 ? (<span className='text-green-700'> Image Uploaded succcessfully</span>) : ('')
                    }
                </p>

                <input id='userName' defaultValue={currentUser.userName} className='bg-slate-100 rounded-lg p-3 self-center w-96' type="text" placeholder='Username'
                    onChange={handleChange}
                />

                <input id='email' defaultValue={currentUser.email} className='bg-slate-100 rounded-lg p-3 self-center w-96' type="email" placeholder='Email'
                    onChange={handleChange}
                />

                <input id='password' className='bg-slate-100 rounded-lg p-3 self-center w-96' type="password" placeholder='Password'

                    onChange={handleChange} />

                <button className='self-center w-96  bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-85 '>
                    {
                        loading ? "Loading...." : "Update"
                    }
                </button>
            </form>

            <div className='flex flex-col mt-5'>
                <div className='self-center w-96'>
                    <div className='flex justify-between  flex-row '>
                        <span onClick={handleDeleteAccount} className='text-red-700 cursor-pointer '>
                            Delete Account
                        </span>

                        <span onClick={handleSignOut} className='text-red-700 cursor-pointer '>
                            sign out
                        </span>
                    </div>
                </div>
            </div>


        </>
    );
};

export default ProfilePage;