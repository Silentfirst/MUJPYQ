const express =require('express')
const app = express()
const router= express.Router()
const Subject = require('../models/subject')

//all subjects route
router.get('/', async (req,res) => {
    let searchOptions={}
    if(req.query.name!=null && req.query.name!==' '){
        searchOptions.name=new RegExp(req.query.name,'i')
    }
    try{
        const subjects = await Subject.find(searchOptions)
        res.render('subjects/index',{
            subjects: subjects,
            searchOptions:req.query
        })
        
    } catch{
        res.redirect('/')
    }
    
})

//New Subject route 
router.get('/new', (req,res) => {
    res.render('subjects/new',{ subject: new Subject()})
})
// new Subject doesn't create anything to the databse, but we can use it to save and update things in our db 


//create subject
router.post('/', async (req,res) => {
    const subject = new Subject({
        name: req.body.name
    })
    try {
        const newSubject = await subject.save()
     //  res.redirect('subjects/$(newSubject.id}') 
        res.redirect('/subjects')
    } catch {
        res.render('subjects/new',{
        subject: subject,
        errorMessage:'Error Creating sub'
        }) 
    }
})

module.exports = router