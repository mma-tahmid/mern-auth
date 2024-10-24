import React from 'react';

const HomePage = () => {

    return (

        <>
            <div className='px-4 py-12 max-w-2xl mx-auto'>
                <h1 className='text-3xl text-center font-bold mb-4 text-slate-800'> Welcome to my Auth APP </h1>

                <p className='mb-4 text-slate-700'>This is full stack web application built with the MERN Stack. It includes authentication features that allows users to Sign up, log in, and log out and provides access to protected routes only for authenticated users</p>

                <p className='mb-4 text-slate-700'>
                    The front-end of the application is built with React and uses React
                    Router for client-side routing. The back-end is built with Node.js and
                    Express, and uses MongoDB as the database. Authentication is implemented
                    using JSON Web Tokens (JWT).
                </p>

                <p className='mb-4 text-slate-700'>
                    This application is intended as a starting point for building full-stack
                    web applications with authentication using the MERN stack. Feel free to
                    use it as a template for your own projects!
                </p>


            </div>

        </>
    );
};

export default HomePage;