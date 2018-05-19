import mongoose from 'mongoose'

const Schema = mongoose.Schema

const stadiumSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name is required']
  },
  image: {
    type: String
  },
  country: {
    type: Schema.Types.ObjectId,
    ref: 'countries'
  },
  sport: {
    type: Schema.Types.ObjectId,
    ref: 'sports'
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

stadiumSchema.index({ '$**': 'text' })

const model = mongoose.model('stadiums', stadiumSchema)

export default model
