const express =require('express')
const router= express.Router()
const app = express()
const multer = require('multer')
const path = require('path')
const fs=require('fs')
const Paper = require('../models/paper')
const Subject= require('../models/subject')
const uploadPath=path.join('public',Paper.coverImageBasePath)
const imageMimeTypes=['image/jpeg','image/png','image/gif']
const upload= multer({
    dest:uploadPath,
    fileFilter: (req,file, callback)=> {
        callback(null, imageMimeTypes.includes(file.mimetype))
    }
})

//all Books route
router.get('/', async (req,res) => {
    let query=Paper.find()
    if(req.query.title!=null && req.query.title!=' ')
    query=query.regex('title',new RegExp(req.query.title,'i'))
    try{
        const papers= await query.exec()
         res.render('papers/index',{
        papers:papers,
        searchOptions:req.query
   })
    } catch{
        res.redirect('/')
    }
  
})

//New paper route 
router.get('/new', async (req,res) => {
    renderNewPage(res,new Paper())
})


//create papers route
router.post('/', upload.single('cover') ,async (req,res) => {
    const fileName=req.file!=null? req.file.filename:null
    const paper = new Paper({
        title: req.body.title,
        subject: req.body.subject,
        paperDate: req.body.paperDate,
        coverImageName:fileName,
        description: req.body.description
    })
    try{
        const newPaper=await paper.save()
        // res.redirect('papers/${newPaper.id}')
        res.redirect('papers')
    } catch{
        if(paper.coverImageName!=null){
        removePaperCover(paper.coverImageName)
        }
        renderNewPage(res,paper,true)
    }
})

function removePaperCover(fileName){
    fs.unlink(path.join(uploadPath,fileName,err => {
        if(err) console.error(err)
    }))
}
//hasError is defaulted to false
async function renderNewPage(res,paper,hasError=false){
    try{
        const subjects= await Subject.find({})
        const params={
            subjects:subjects,
            paper:paper
        }
        
        if(hasError) params.errorMessage='Error Creating Paper'
        res.render('papers/new',params)
    } catch {
        res.redirect('/papers')
    }
}

module.exports = router