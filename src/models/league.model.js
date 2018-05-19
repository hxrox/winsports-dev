import mongoose from 'mongoose'

const Schema = mongoose.Schema

const leagueSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name is required']
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  country: {
    type: Schema.Types.ObjectId,
    ref: 'modules'
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

leagueSchema.index({ '$**': 'text' })

const model = mongoose.model('leagues', leagueSchema)

export default model
