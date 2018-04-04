import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

import config from '../server.config';

autoIncrement.initialize(mongoose.createConnection(config.DATABASE.MONGODB_STRING_CONNECTION, { useMongoClient: true }))

const Schema = mongoose.Schema;
const eventSchema = new Schema({
    folio: {
        type: Number,
        index: { unique: true }
    },
    name: {
        type: String,
        required: [true, 'name is required']
    },
    paymentMethods: [
        {
            paymentMethod: {
                type: Schema.Types.ObjectId,
                ref: 'payment_methods',
                paymentMethod: [true, 'paymentMethod is required']
            },
            amount: {
                type: Number,
                default: 0
            }
        }
    ],
    isPublic: {
        type: Boolean,
        default: true
    },
    isGuaranteed: {
        type: Boolean,
        default: true
    },
    endAt: {
        type: Date,
        required: [true, 'EndAt is required']
    },
    closedAt: {
        type: Date
    },
    country: {
        type: Schema.Types.ObjectId,
        ref: 'countries',
        required: [true, 'country is required']
    },
    games: [
        {
            type: Schema.Types.ObjectId,
            ref: 'games',
            required: [true, 'games is required']
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
});

eventSchema.index({ '$**': 'text' });
eventSchema.plugin(autoIncrement.plugin, {
    model: 'events',
    field: 'folio',
    startAt: 1000,
    incrementBy: 1
});

export default mongoose.model('events', eventSchema);