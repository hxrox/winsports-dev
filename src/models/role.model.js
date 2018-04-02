import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const roleSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    description: {
        type: String
    },
    actions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'actions'
        }
    ],
    application: {
        type: Schema.Types.ObjectId,
        ref: 'applications',
        required: [true, 'application is required']
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

roleSchema.index({ '$**': 'text' });

const model = mongoose.model('roles', roleSchema);

export default model;