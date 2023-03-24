const express =require('express')
const router= express.Router()
const app = express()
const Paper = require('../models/paper')
const Subject= require('../models/subject')
const imageMimeTypes=['image/jpeg','image/png','image/gif']


//all   Books route
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
router.post('/' ,async (req,res) => {
    const paper = new Paper({
        title: req.body.title,
        subject: req.body.subject,
        paperDate: req.body.paperDate,
        description: req.body.description
    })
    saveCover(paper, req.body.cover)

    try{
        const newPaper=await paper.save()
        // res.redirect('papers/${newPaper.id}')
        res.redirect('papers')
    } catch{
        renderNewPage(res,paper,true)
    }
})



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

function saveCover(paper,coverEncoded){
    if(coverEncoded ==null) return;
    const cover= JSON.parse(coverEncoded);
    if(cover!=null && imageMimeTypes.includes(cover.type)){
        paper.coverImage= new Buffer.from(cover.data,'base64');
        paper.coverImageType=cover.type;

    }

}

module.exports = router