import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from '../firebase/firebaseConfig';


const ProfilePage = () => {

    const { currentUser } = useSelector((state) => state.user)

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

    return (


        //Firebase storage Rules
        //     allow read,
        //         allow write: if
        //   request.resource.size < 2 * 1024 * 1024 &&
        //             request.resource.contentType.matches('image/.*')

        <>
            <h1 className='text-3xl font-semibold text-center my-7 '> profile </h1>

            <form className='flex flex-col gap-4'>

                <input type="file" ref={fileRef} hidden accept='image/*'

                    onChange={(event) => setImage(event.target.files[0])}
                />

                <img className='h-24 w-24 self-center cursor-pointer rounded-full object-cover' src={currentUser.profilePicture} alt="profile-image"

                    onClick={() => fileRef.current.click()}
                />

                <p className='text-sm self-center'>
                    {
                        imageError ? (<span className='text-red-700'> Error Uploading image</span>) : imagePercent > 0 && imagePercent < 100 ? (<span className='text-slate-700'> {`Uploading ${imagePercent} % `}</span>) : imagePercent === 100 ? (<span className='text-green-700'> Image Uploaded succcessfully</span>) : ('')
                    }
                </p>

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