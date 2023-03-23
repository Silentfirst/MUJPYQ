if (process.env.NODE_ENV !=='production'){
    require('dotenv').config()
}
const express =require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')


const indexRouter= require('./routes/index')
const subjectRouter= require('./routes/subjects')
const paperRouter= require('./routes/papers')


app.set('view engine','ejs')
app.set('views',__dirname+'/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit:'10mb', extended:false}))


const mongoose = require('mongoose')
console.log('connecting to mongo')
const db = mongoose.connection
mongoose.connect(process.env.DATABASE_URL, {
  useUnifiedTopology: true
})
.then(() => console.log('Mongoose connected'))
.catch(error => console.error(error));
console.log('successful')



app.use('/', indexRouter)
app.use('/subjects', subjectRouter)
app.use('/papers',paperRouter)

app.listen(process.env.PORT || 3000) //server gonna tell the port it is listening to, by defgault it is 3000