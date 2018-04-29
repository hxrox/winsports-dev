import leagueModel from '../../models/league.model';

export default {
    leagues: (root, args, context, info) => {
        if (args.searchTerm) {
            return leagueModel.find({ $text: { $search: args.searchTerm } });
        } else {
            return leagueModel.find();
        }
    },
    leaguesByCountryId: (root, args, context, info) => {
        return leagueModel.find({ country: root._id });
    },
    leaguesBySportId: (root, args, context, info) => {
        return leagueModel.find({ sport: root._id });
    },
    leaguesByIds: (root, args, context, info) => {
        return leagueModel.find({ _id: { $in: root.leagues } });
    },
    league: (root, args, context, info) => {
        if (root) {
            return leagueModel.findOne({ _id: root.league });
        } else {
            return leagueModel.findOne({ _id: args.id });
        }
    },
    addLeague: (root, args, context, info) => {
        const model = new leagueModel(args);
        model.country = args.countryId;
        model.sport = args.sportId;
        model.createdBy = context.user.id;
        return model.save();
    },
    editLeague: (root, args, context, info) => {
        return leagueModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                name: args.name,
                description: args.description,
                image: args.image,
                country: args.countryId,
                sport: args.sportId,
                active: args.active,
                updatedAt: Date.now(),
                updatedBy: context.user.id
            }
        }, { new: true });
    },
    trashLeague: (root, args, context, info) => {
        return leagueModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                deletedAt: Date.now(),
                deletedBy: context.user.id
            }
        }, { new: true });
    },
    recoverLeague: (root, args, context, info) => {
        return leagueModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                deletedAt: null,
                deletedBy: context.user.id
            }
        }, { new: true });
    },
    deleteLeague: (root, args, context, info) => {
        return leagueModel.findOneAndRemove({ _id: args.id }, { rawResult: true });
    }
}