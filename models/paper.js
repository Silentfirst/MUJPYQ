const mongoose=require('mongoose')

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
    coverImage: {
        type: Buffer, 
        required: true
    },
    coverImageType:{
        type: String,
        required:true
    },
    subject:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Subject' 
    }
    
})

paperSchema.virtual('coverImagePath').get(function() {
    if (this.coverImage != null && this.coverImageType != null) {
        return `data:${this.coverImageType};charset=utf-8;base64,${this.coverImage.toString('base64')}`
      }
    })

module.exports  = mongoose.model('Paper',paperSchema)
