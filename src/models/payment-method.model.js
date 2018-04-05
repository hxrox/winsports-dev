import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const paymentMethodSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    icon: {
        type: String,
        required: [true, 'icon is required']
    },
    iconIonic: {
        type: String,
        required: [true, 'iconIonic is required']
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

paymentMethodSchema.index({ '$**': 'text' });

export default mongoose.model('payment_methods', paymentMethodSchema);