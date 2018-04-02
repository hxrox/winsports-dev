import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const sportSchema = new Schema({
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
});

sportSchema.index({ '$**': 'text' });

const model = mongoose.model('sports', sportSchema);

export default model;