import mongoose from 'mongoose'

const Schema = mongoose.Schema

const applicationTypeSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    index: { unique: true }
  },
  description: {
    type: String
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

applicationTypeSchema.index({ '$**': 'text' })

const model = mongoose.model('application_types', applicationTypeSchema)

export default model
