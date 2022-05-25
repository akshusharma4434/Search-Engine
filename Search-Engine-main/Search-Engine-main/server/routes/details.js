const router = require("express").Router();
const Details = require("../models/details")

router.post('/update/data', async (req, res) => {
    try {
        const { name, location } = req.body;
        if (!name || !location) return
        const detail = new Details({ name: name, location: location })
        await detail.save()
        const data = await Details.find()
        res.send(data)
    } catch (err) {
        res.status(400).json(err)
    }
})

router.get("/data", async (req, res) => {
    try {
        const data = await Details.find()
        res.send(data)
    } catch (err) { res.status(400).json(err) }
})

router.get("/search", (req, res) => {
    try {
        const {test} = req.body;
        if(!test)  console.log(test)
        Details.findOne({location:test},(err,data) => {
            if(err) res.json(err)
            res.json(data)
        })
    } catch (err) { res.status(400).json(err) }
})

module.exports = router;