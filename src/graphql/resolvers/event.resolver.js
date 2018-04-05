import eventModel from '../../models/event.model';

export default {
    events: (root, { searchTerm }) => {
        if (searchTerm) {
            return eventModel.find({ $text: { $search: searchTerm } });
        } else {
            return eventModel.find();
        }
    },
    eventsByCountryId: (root) => {
        return eventModel.find({ country: root._id });
    },
    eventsBySportId: (root) => {
        return eventModel.find({ sport: root._id });
    },
    eventsByLeagueId: (root) => {
        return eventModel.find({ league: root._id });
    },
    eventsByGameId: (root) => {
        return eventModel.find({ games: root._id });
    },
    event: (root, { id }) => {
        if (root) {
            return eventModel.findOne({ _id: root.event });
        } else {
            return eventModel.findOne({ _id: id });
        }
    },
    addEvent: (root, args) => {
        const model = new eventModel(args);
        model.country = args.countryId;
        model.league = args.leagueId;
        model.sport = args.sportId;
        model.createdAt = new Date;
        return model.save();
    },
    editEvent: (root, args) => {
        return eventModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                name: args.name,
                isPublic: args.isPublic,
                isGuaranteed: args.isGuaranteed,
                endAt: args.endAt,
                closedAt: args.closedAt,
                games: args.games,
                paymentMethods: args.paymentMethods,
                country: args.countryId,
                league: args.leagueId,
                sport: args.sportId,
                active: args.active,
                updatedAt: Date.now()
            }
        }, { new: true });
    },
    deleteLogicEvent: (root, { id }) => {
        return eventModel.findOneAndUpdate({ _id: id }, {
            $set: {
                deletedAt: Date.now()
            }
        }, { new: true });
    },
    deleteEvent: (root, { id }) => {
        return eventModel.findOneAndRemove({ _id: id }, { rawResult: true });
    }
}