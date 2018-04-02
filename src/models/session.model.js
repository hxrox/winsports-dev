import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: [true, 'userId is required']
    },
    application: {
        type: Schema.Types.ObjectId,
        ref: 'applications',
        required: [true, 'userId is required']
    },
    ipAddress: {
        type: String,
        required: [true, 'ipAddress is required']
    },
    accessToken: {
        type: String,
        required: [true, 'ipAddress is required']
    },
    os: {
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
    logoutAt: {
        type: Date
    },
    logoutBy: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    expiredAt: {
        type: Date
    }
});

sessionSchema.index({ '$**': 'text' });

const model = mongoose.model('sessions', sessionSchema);

export default model;