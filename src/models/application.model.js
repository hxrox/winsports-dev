import mongoose from 'mongoose'

const Schema = mongoose.Schema

const applicationSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name is required']
  },
  description: {
    type: String
  },
  clientId: {
    type: String,
    required: [true, 'clientId is required']
  },
  clientSecret: {
    type: String,
    required: [true, 'clientSecret is required']
  },
  version: {
    type: String,
    default: '1.0.0'
  },
  iosId: {
    type: String
  },
  androidId: {
    type: String
  },
  active: {
    type: Boolean,
    default: true
  },
  applicationType: {
    type: Schema.Types.ObjectId,
    ref: 'application_types'
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

applicationSchema.index({ '$**': 'text' })

const model = mongoose.model('applications', applicationSchema)

export default model
