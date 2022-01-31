const Router = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const router = new Router

router.post('/registration',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Password should be longer than 3 and less than 12 symbols').isLength({min: 3, max: 12})
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)
        console.log(errors)
        if(!errors.isEmpty()) {
            return res.status(400).json({error: "Could not validate entered credentials"})
        }

        console.log(req.body)
        const {email, password, firstName, lastName} = req.body

        const candidate = await User.findOne({email})

        if(candidate) {
            return res.status(400).json({error: "This email was already registered"})
        }
        const hashedPassword = await bcrypt.hash(password, 15)
        const user = new User({
            email,
            password: hashedPassword,
            firstName,
            lastName
        })
        await user.save()
        return res.json({message: "User was registered"})

    } catch (e) {
        console.log(e)
        res.send({error: "Server Error"})
    }

})

module.exports = router
