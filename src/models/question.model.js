import mongoose from 'mongoose'

const Schema = mongoose.Schema

const questionSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name is required']
  },
  point: {
    type: Number,
    default: 3
  },
  sport: {
    type: Schema.Types.ObjectId,
    ref: 'sports',
    required: [true, 'sport is required']
  },
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  updatedAt: {
    type: Date
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  deletedAt: {
    type: Date
  },
  deletedBy: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
})

questionSchema.index({ '$**': 'text' })

const model = mongoose.model('questions', questionSchema)

export default model
