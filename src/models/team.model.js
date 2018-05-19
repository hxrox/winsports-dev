import mongoose from 'mongoose'

const Schema = mongoose.Schema

const teamSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name is required']
  },
  shortName: {
    type: String,
    required: [true, 'shortName is required']
  },
  image: {
    type: String,
    required: [true, 'image is required']
  },
  sport: {
    type: Schema.Types.ObjectId,
    ref: 'sports',
    required: [true, 'sport is required']
  },
  stadium: {
    type: Schema.Types.ObjectId,
    ref: 'stadiums',
    required: [true, 'stadium is required']
  },
  country: {
    type: Schema.Types.ObjectId,
    ref: 'countries',
    required: [true, 'country is required']
  },
  leagues: [
    {
      type: Schema.Types.ObjectId,
      ref: 'leagues'
    }
  ],
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

teamSchema.index({ '$**': 'text' })

const model = mongoose.model('teams', teamSchema)

export default model
