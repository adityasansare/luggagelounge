const express = require("express");
const router = express.Router();
const {User} = require("../models/user");

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    // Check if any of the required fields is empty
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please fill in all required fields." });
    }

    try {
        // Check if a user with the same email already exists
        let existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'That user already exists!' });
        }

        // Create a new user
        const newUser = new User({
            name,
            email,
            password,
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


router.post("/login", async(req,res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email : email , password : password });

    
    try {
        if (user) {
            const temp = {
                name : user.name,
                email : user.email,
                isAdmin : user.isAdmin,
                _id : user._id,
            };

            res.status(200).json(temp);
        }
        else {
            res.status(400).json({ message : "Invalid email or password"})
        } 
    } catch (error) {
        return res.status(400).json({ message : error})
    }
});

router.get("/getallusers", async(req,res) => {
    try {
        const users = await User.find()
        res.send(users)
    } catch (error) {
        return res.status(400).json({error});
        
    }

});

module.exports = router;