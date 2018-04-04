import gameModel from '../../models/game.model';

export default {
    games: (root, { searchTerm }) => {
        if (searchTerm) {
            return gameModel.find({ $text: { $search: searchTerm } });
        } else {
            return gameModel.find();
        }
    },
    gamesByCountryId: (root) => {
        return gameModel.find({ country: root._id });
    },
    gamesBySportId: (root) => {
        return gameModel.find({ sport: root._id });
    },
    gamesByStadiumId: (root) => {
        return gameModel.find({ stadium: root._id });
    },
    gamesByLeagueId: (root) => {
        return gameModel.find({ league: root._id });
    },
    gamesByQuestionId: (root) => {
        return gameModel.find({ questions: root._id });
    },
    gamesByLocalTeamId: (root) => {
        return gameModel.find({ localTeam: root._id });
    },
    gamesByVisitorTeamId: (root) => {
        return gameModel.find({ visitorTeam: root._id });
    },
    game: (root, { id }) => {
        if (root) {
            return gameModel.findOne({ _id: root.game });
        } else {
            return gameModel.findOne({ _id: id });
        }
    },
    addGame: (root, args) => {
        const model = new gameModel(args);
        model.localTeam = args.localTeamId;
        model.visitorTeam = args.visitorTeamId;
        model.country = args.countryId;
        model.sport = args.sportId;
        model.stadium = args.stadiumId;
        model.league = args.leagueId;
        model.createdAt = new Date;
        return model.save();
    },
    editGame: (root, args) => {
        return gameModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                name: args.name,
                shortName: args.shortName,
                image: args.image,
                country: args.countryId,
                sport: args.sportId,
                stadium: args.stadiumId,
                league: args.leagueId,
                questions: args.questions,
                active: args.active,
                updatedAt: Date.now()
            }
        }, { new: true });
    },
    deleteLogicGame: (root, { id }) => {
        return gameModel.findOneAndUpdate({ _id: id }, {
            $set: {
                deletedAt: Date.now()
            }
        }, { new: true });
    },
    deleteGame: (root, { id }) => {
        return gameModel.findOneAndRemove({ _id: id }, { rawResult: true });
    }
}