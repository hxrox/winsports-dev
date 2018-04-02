import leagueModel from '../../models/league.model';

export default {
    leagues: (root, { searchTerm }) => {
        if (searchTerm) {
            return leagueModel.find({ $text: { $search: searchTerm } });
        } else {
            return leagueModel.find();
        }
    },
    leaguesByCountryId: (root, { searchTerm }) => {
        return leagueModel.find({ country: root._id });
    },
    league: (root, { id }) => {
        if (root) {
            return leagueModel.findOne({ _id: root.module });
        } else {
            return leagueModel.findOne({ _id: id });
        }
    },
    addLeague: (root, args) => {
        const model = new leagueModel(args);
        model.country = args.countryId;
        model.createdAt = new Date;
        return model.save();
    },
    editLeague: (root, args) => {
        return leagueModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                name: args.name,
                description: args.description,
                image: args.image,
                country: args.countryId,
                active: args.active,
                updatedAt: Date.now()
            }
        }, { new: true });
    },
    deleteLogicLeague: (root, { id }) => {
        return leagueModel.findOneAndUpdate({ _id: id }, {
            $set: {
                deletedAt: Date.now()
            }
        }, { new: true });
    },
    deleteLeague: (root, { id }) => {
        return leagueModel.findOneAndRemove({ _id: id }, { rawResult: true });
    }
}