const express= require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    res.render('index.ejs')
})

//route was hooked to this server
module.exports= router