const mongoose=require('mongoose')
const path=require('path')
const coverImageBasePath='uploads/paperCovers'

const paperSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    paperDate: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    coverImageName: {
        type: String, 
        required: true
    },
    subject:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Subject' 
    }
    
})

paperSchema.virtual('coverImagePath').get(function() {
    if (this.coverImageName != null) {
      return path.join('/', coverImageBasePath, this.coverImageName)
    }
  })

module.exports  = mongoose.model('Paper',paperSchema)
module.exports.coverImageBasePath= coverImageBasePath