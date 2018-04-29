import teamModel from '../../models/team.model';

export default {
    teams: (root, args, context, info) => {
        if (searchTerm) {
            return teamModel.find({ $text: { $search: args.searchTerm } });
        } else {
            return teamModel.find();
        }
    },
    teamsByCountryId: (root, args, context, info) => {
        return teamModel.find({ country: root._id });
    },
    teamsBySportId: (root, args, context, info) => {
        return teamModel.find({ sport: root._id });
    },
    teamsByStadiumId: (root, args, context, info) => {
        return teamModel.findOne({ stadium: root._id });
    },
    teamsByLeagueId: (root, args, context, info) => {
        return teamModel.find({ leagues: root._id });
    },
    teamsByIds: (root, args, context, info) => {
        return teamModel.find({ _id: { $in: root.teams } });
    },
    team: (root, args, context, info) => {
        if (root) {
            return teamModel.findOne({ _id: root.team });
        } else {
            return teamModel.findOne({ _id: args.id });
        }
    },
    teamByLocalTeam: (root, args, context, info) => {
        if (root) {
            return teamModel.findOne({ _id: root.localTeam });
        } else {
            return teamModel.findOne({ _id: args.id });
        }
    },
    teamByVisitorTeam: (root, args, context, info) => {
        if (root) {
            return teamModel.findOne({ _id: root.visitorTeam });
        } else {
            return teamModel.findOne({ _id: args.id });
        }
    },
    addTeam: (root, args, context, info) => {
        const model = new teamModel(args);
        model.country = args.countryId;
        model.sport = args.sportId;
        model.stadium = args.stadiumId;
        model.createdBy = context.user.id;
        return model.save();
    },
    editTeam: (root, args, context, info) => {
        return teamModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                name: args.name,
                shortName: args.shortName,
                image: args.image,
                country: args.countryId,
                sport: args.sportId,
                stadium: args.stadiumId,
                leagues: args.leagues,
                active: args.active,
                updatedAt: Date.now(),
                updatedBy: context.user.id
            }
        }, { new: true });
    },
    trashTeam: (root, args, context, info) => {
        return teamModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                deletedAt: Date.now(),
                updatedBy: context.user.id
            }
        }, { new: true });
    },
    recoverTeam: (root, args, context, info) => {
        return teamModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                deletedAt: null,
                updatedBy: context.user.id
            }
        }, { new: true });
    },
    deleteTeam: (root, args, context, info) => {
        return teamModel.findOneAndRemove({ _id: args.id }, { rawResult: true });
    }
}