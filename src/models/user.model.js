import mongoose from 'mongoose';
import uuid from 'uuid/v1';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    lastName: {
        type: String,
        required: [true, 'lastName is required']
    },
    userName: {
        type: String,
        required: [true, 'userName is required'],
        index: { unique: true }
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        index: { unique: true }
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    birthDate: {
        type: Date
    },
    emailConfirmed: {
        type: Boolean,
        default: false
    },
    emailConfirmationToken: {
        type: String,
        default: uuid
    },
    active: {
        type: Boolean,
        default: true
    },
    actions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'actions'
        }
    ],
    roles: [
        {
            type: Schema.Types.ObjectId,
            ref: 'roles'
        }
    ],
    teams: [
        {
            type: Schema.Types.ObjectId,
            ref: 'teams'
        }
    ],
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

userSchema.index({ '$**': 'text' });

const model = mongoose.model('users', userSchema);

export default model;