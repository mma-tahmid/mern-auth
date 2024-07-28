const userModels = require("../models/userModel")
const bcryptss = require('bcrypt');

exports.Registration = async (req, res) => {

    try {

        const { userName, email, password } = req.body

        if (!userName) {
            return res.send({ errors: "User name is required" })
        }

        if (!email) {
            return res.send({ errors: "Email is required" })
        }

        if (!password) {
            return res.send({ errors: "Password is required" })
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

}