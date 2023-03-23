const express= require('express')
const router = express.Router()
const Paper=require('../models/paper')


router.get('/',async (req,res)=>{
    let papers
    try {
        papers=await Paper.find().sort({createAt: 'desc'}).limit(5).exec()

    } catch {
        papers=[]
    }
    res.render('index',{ papers:papers })
})

//route was hooked to this server
module.exports= router