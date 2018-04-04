import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const gameSchema = new Schema({
    localTeam: {
        type: Schema.Types.ObjectId,
        ref: 'teams',
        required: [true, 'localTeam is required']
    },
    visitorTeam: {
        type: Schema.Types.ObjectId,
        ref: 'teams',
        required: [true, 'visitorTeam is required']
    },
    localTeamResult: {
        type: Number,
        default: 0
    },
    visitorTeamResult: {
        type: Number,
        default: 0
    },
    questions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'questions'
        }
    ],
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
    league: {
        type: Schema.Types.ObjectId,
        ref: 'leagues'
    },
    startAt: {
        type: Date,
        required: [true, 'startAt is required']
    },
    endAt: {
        type: Date
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

gameSchema.index({ '$**': 'text' });

const model = mongoose.model('games', gameSchema);

export default model;