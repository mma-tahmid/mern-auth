const userModels = require("../models/userModel")
const bcryptss = require('bcrypt');

var jwt = require('jsonwebtoken');

exports.Registration = async (req, res) => {

    try {

        const { userName, email, password } = req.body

        if (!userName) {
            return res.send({ message: "User name is required" })
        }

        if (!email) {
            return res.send({ message: "Email is required" })
        }

        if (!password) {
            return res.send({ message: "Password is required" })
        }


        // Check existing users
        const existingUser = await userModels.findOne({ email })

        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "Already Register Please Login",
            })
        }

        // Check existing user Name
        const sameUserName = await userModels.findOne({ userName })
        if (sameUserName) {
            return res.status(200).send({
                success: false,
                message: "user name is not available",
            })
        }

        // new user can Register now 
        // create Hash password
        const salt = bcryptss.genSaltSync(10);
        const hashed = bcryptss.hashSync(password, salt); // if use only hash (alternate of hashSync) then use await 

        const user = await new userModels({
            userName,
            email,
            password: hashed
        }).save()


        res.status(200).send({
            success: true,
            message: "user Register Successfully",
            output: user
        })


    }

    catch (error) {

        console.log(error)

        res.status(500).send({
            success: false,
            message: "Error in Registration",
            error
        })
    }


}



exports.Login = async (req, res) => {

    try {

        const { email, password } = req.body

        if (!email) {
            return res.send({ message: "Email is required" })
        }

        if (!password) {
            return res.send({ message: "Password is required" })
        }


        const validUser = await userModels.findOne({ email })

        if (!validUser) {
            return res.status(200).send({
                success: false,
                message: "Email is Not Resigtered",
            })
        }


        const isMatchingPassword = await bcryptss.compare(password, validUser.password) // .compare() by default compare function

        if (!isMatchingPassword) {
            return res.status(200).send({
                success: false,
                message: "Wrong Credentials",
            })
        }


        //Create Token
        // Create token using sign() method

        const createToken = jwt.sign(
            { id: validUser._id },
            process.env.JWT_SECRET_KEY,
        )
        // ending of token creation part

        // Doesn't show passowrd Field
        // Exclude the password field from the user object before sending the response
        const { password: excludedPassword, ...otherDetails } = validUser.toObject();

        // res.cookie(
        //     "access_token", // token name
        //     createToken,
        //     {
        //         expires: new Date(Date.now() + 3600000), // 1hour
        //         httpOnly: true
        //     }
        // ).status(200).json(otherDetails)


        res.cookie(
            "access_token", // token name 
            createToken,
            {
                expires: new Date(Date.now() + 3600000), // 1hour
                // expires: new Date(Date.now() + 3 * 3600000), // 3 hours
                // expires: new Date(Date.now() + 24 * 3600000), // one day
                httpOnly: true
            }
        ).status(200).send({
            success: true,
            message: "Login Successfully",
            output: otherDetails
        })



    }

    catch (error) {

        //console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Login",
            error
        })

    }

}



exports.Google = async (req, res) => {

    try {


        //const { email } = req.body // this part use for only new registration

        const findexitingUser = await userModels.findOne({ email: req.body.emails })

        if (findexitingUser) {
            //Create Token
            // Create token using sign() method
            const createToken = jwt.sign(
                { id: findexitingUser._id },
                process.env.JWT_SECRET_KEY,
            )
            // ending of token creation part

            const { password: excludedPassword, ...otherDetails } = findexitingUser.toObject();

            res.cookie(
                "access_token", // token name 
                createToken,
                {
                    expires: new Date(Date.now() + 3600000), // 1hour
                    // expires: new Date(Date.now() + 3 * 3600000), // 3 hours
                    // expires: new Date(Date.now() + 24 * 3600000), // one day
                    httpOnly: true
                }
            ).status(200).send({
                success: true,
                message: "Login Successfully",
                output: otherDetails
            })
        }


        else {
            // if user does not exits then create random password

            const generatePasssword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
            // 8 digit password (total 16 digit password 8+8=16) 36 means --> 0 to 9 & a to z 

            // hashing the Password 
            const salt = bcryptss.genSaltSync(10);
            const hasheds = bcryptss.hashSync(generatePasssword, salt);


            const newUser = await new userModels({
                userName: req.body.names.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-8),
                email: req.body.emails, // this emails comes from OAuth.jsx
                profilePicture: req.body.photo, //this photo comes from OAuth.jsx
                password: hasheds
            }).save()


            // Create token using sign() method
            const createToken = jwt.sign(
                { id: newUser._id },
                process.env.JWT_SECRET_KEY,
            )
            // ending of token creation part

            const { password: excludedPassword2, ...otherDetails } = newUser.toObject();

            res.cookie(
                "access_token", // token name 
                createToken,
                {
                    expires: new Date(Date.now() + 3600000), // 1hour
                    // expires: new Date(Date.now() + 3 * 3600000), // 3 hours
                    // expires: new Date(Date.now() + 24 * 3600000), // one day
                    httpOnly: true
                }
            ).status(200).send({
                success: true,
                message: "Login Successfully",
                output: otherDetails
            })


        }

    }


    catch (error) {
        console.log(error)
    }
}




exports.UpdateUser = async (req, res) => {

    //req.userInformation.id (this .id is assuming)
    if (String(req.userInformation.id) !== String(req.params.ids)) {
        return res.status(401).send({ message: "You can update only your account" })
    }

    try {

        if (req.body.password) {
            req.body.password = bcryptss.hashSync(req.body.password, 10)
        }


        //const updateUser = await userModels.findByIdAndUpdate(req.params.ids, { $set: req.body }, { new: true })
        const updateUser = await userModels.findByIdAndUpdate(req.params.ids, {
            $set: {
                userName: req.body.userName,
                email: req.body.email,
                password: req.body.password,
                profilePicture: req.body.profilePicture

            }
        }, { new: true })

        const { password, ...rest } = updateUser.toObject();

        res.status(200).send({
            success: true,
            message: "user updated Successfully",
            output: rest
        })


    }


    catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in Update user",
            error
        })
    }
}
