const express = require("express");
const router = express.Router();

const Locker = require('../models/locker')

router.get("/getalllockers", async(req,res) => {
    try {
        const lockers = await Locker.find({})
        res.send(lockers);
    } catch (error) {
        return res.status(400).json({ message : error})
    }
});

router.post("/getlockerbyid/:id", async(req,res) => {
    try {
        const locker = await Locker.findOne({_id : req.params.id})
        res.send(locker);
    } catch (error) {
        return res.status(400).json({ message : error})
    }
});

router.post("/addlockers", async(req, res)=> {

    try {
        const newroom = new Locker(req.body)
        await newroom.save()

        res.send('New Room Added Successfully')
    } catch (error) {
        return res.status(400).json({error})
    }


});

module.exports = router;