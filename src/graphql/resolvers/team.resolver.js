import teamModel from '../../models/team.model';

export default {
    teams: (root, { searchTerm }, context) => {
        console.log(context);
        if (searchTerm) {
            return teamModel.find({ $text: { $search: searchTerm } });
        } else {
            return teamModel.find();
        }
    },
    teamsByCountryId: (root, { searchTerm }) => {
        return teamModel.find({ country: root._id });
    },
    teamsBySportId: (root, { searchTerm }) => {
        return teamModel.find({ sport: root._id });
    },
    teamsByStadiumId: (root, { searchTerm }) => {
        return teamModel.findOne({ stadium: root._id });
    },
    teamsByLeagueId: (root) => {
        return teamModel.find({ leagues: root._id });
    },
    team: (root, { id }) => {
        if (root) {
            return teamModel.findOne({ _id: root.team });
        } else {
            return teamModel.findOne({ _id: id });
        }
    },
    teamByLocalTeam: (root, { id }) => {
        if (root) {
            return teamModel.findOne({ _id: root.localTeam });
        } else {
            return teamModel.findOne({ _id: id });
        }
    },
    teamByVisitorTeam: (root, { id }) => {
        if (root) {
            return teamModel.findOne({ _id: root.visitorTeam });
        } else {
            return teamModel.findOne({ _id: id });
        }
    },
    addTeam: (root, args) => {
        const model = new teamModel(args);
        model.country = args.countryId;
        model.sport = args.sportId;
        model.stadium = args.stadiumId;
        model.createdAt = new Date;
        return model.save();
    },
    editTeam: (root, args) => {
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
                updatedAt: Date.now()
            }
        }, { new: true });
    },
    deleteLogicTeam: (root, { id }) => {
        return teamModel.findOneAndUpdate({ _id: id }, {
            $set: {
                deletedAt: Date.now()
            }
        }, { new: true });
    },
    deleteTeam: (root, { id }) => {
        return teamModel.findOneAndRemove({ _id: id }, { rawResult: true });
    }
}