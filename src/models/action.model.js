import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const actionSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    description: {
        type: String
    },
    module: {
        type: Schema.Types.ObjectId,
        ref: 'modules'
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

actionSchema.index({ '$**': 'text' });

const model = mongoose.model('actions', actionSchema);

export default model;