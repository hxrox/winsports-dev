import eventModel from '../../models/event.model';

export default {
    events: (root, args, context, info) => {
        if (args.searchTerm) {
            return eventModel.find({ $text: { $search: args.searchTerm } });
        } else {
            return eventModel.find();
        }
    },
    eventsByCountryId: (root, args, context, info) => {
        return eventModel.find({ country: root._id });
    },
    eventsBySportId: (root, args, context, info) => {
        return eventModel.find({ sport: root._id });
    },
    eventsByLeagueId: (root, args, context, info) => {
        return eventModel.find({ league: root._id });
    },
    eventsByGameId: (root, args, context, info) => {
        return eventModel.find({ games: root._id });
    },
    event: (root, args, context, info) => {
        if (root) {
            return eventModel.findOne({ _id: root.event });
        } else {
            return eventModel.findOne({ _id: args.id });
        }
    },
    addEvent: (root, args, context, info) => {
        const model = new eventModel(args);
        model.country = args.countryId;
        model.league = args.leagueId;
        model.sport = args.sportId;
        model.createdBy = context.user.id;
        return model.save();
    },
    editEvent: (root, args, context, info) => {
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
                updatedAt: Date.now(),
                updatedBy: context.user.id
            }
        }, { new: true });
    },
    trashEvent: (root, args, context, info) => {
        return eventModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                deletedAt: Date.now(),
                deletedBy: context.user.id
            }
        }, { new: true });
    },
    recoverEvent: (root, args, context, info) => {
        return eventModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                deletedAt: null,
                deletedBy: context.user.id
            }
        }, { new: true });
    },
    deleteEvent: (root, args, context, info) => {
        return eventModel.findOneAndRemove({ _id: args.id }, { rawResult: true });
    }
}