import gameModel from '../../models/game.model';

export default {
    games: (root, args, context, info) => {
        if (args.searchTerm) {
            return gameModel.find({ $text: { $search: args.searchTerm } });
        } else {
            return gameModel.find();
        }
    },
    gamesByCountryId: (root, args, context, info) => {
        return gameModel.find({ country: root._id });
    },
    gamesBySportId: (root, args, context, info) => {
        return gameModel.find({ sport: root._id });
    },
    gamesByStadiumId: (root, args, context, info) => {
        return gameModel.find({ stadium: root._id });
    },
    gamesByLeagueId: (root, args, context, info) => {
        return gameModel.find({ league: root._id });
    },
    gamesByQuestionId: (root, args, context, info) => {
        return gameModel.find({ questions: root._id });
    },
    gamesByLocalTeamId: (root, args, context, info) => {
        return gameModel.find({ localTeam: root._id });
    },
    gamesByVisitorTeamId: (root, args, context, info) => {
        return gameModel.find({ visitorTeam: root._id });
    },
    gamesByIds: (root, args, context, info) => {
        return gameModel.find({ _id: { $in: root.games } });
    },
    game: (root, args, context, info) => {
        if (root) {
            return gameModel.findOne({ _id: root.game });
        } else {
            return gameModel.findOne({ _id: args.id });
        }
    },
    addGame: (root, args, context, info) => {
        const model = new gameModel(args);
        model.localTeam = args.localTeamId;
        model.visitorTeam = args.visitorTeamId;
        model.country = args.countryId;
        model.sport = args.sportId;
        model.stadium = args.stadiumId;
        model.league = args.leagueId;
        model.createdBy = context.user.id;
        return model.save();
    },
    editGame: (root, args, context, info) => {
        return gameModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                localTeam: args.localTeamId,
                visitorTeam: args.visitorTeamId,
                localTeamResult: args.localTeamResult,
                visiorTeamResult: args.visiorTeamResult,
                country: args.countryId,
                sport: args.sportId,
                stadium: args.stadiumId,
                league: args.leagueId,
                questions: args.questions,
                startAt: args.startAt,
                active: args.active,
                updatedAt: Date.now(),
                updatedBy: context.user.id
            }
        }, { new: true });
    },
    trashGame: (root, args, context, info) => {
        return gameModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                deletedAt: Date.now(),
                deletedBy: context.user.id
            }
        }, { new: true });
    },
    recoverGame: (root, args, context, info) => {
        return gameModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                deletedAt: null,
                deletedBy: context.user.id
            }
        }, { new: true });
    },
    deleteGame: (root, args, context, info) => {
        return gameModel.findOneAndRemove({ _id: args.id }, { rawResult: true });
    },
    addGoalLocalGame: (root, args, context, info) => {
        return gameModel.findOneAndUpdate({ _id: args.id }, {
            $inc: {
                localTeamResult: 1
            }
        }, { new: true });
    },
    removeGoalLocalGame: (root, args, context, info) => {
        return gameModel.findOneAndUpdate({ _id: args.id }, {
            $inc: {
                localTeamResult: -1
            }
        }, { new: true });
    },
    addGoalVisitorGame: (root, args, context, info) => {
        return gameModel.findOneAndUpdate({ _id: args.id }, {
            $inc: {
                visitorTeamResult: 1
            }
        }, { new: true });
    },
    removeGoalVisitorGame: (root, args, context, info) => {
        return gameModel.findOneAndUpdate({ _id: args.id }, {
            $inc: {
                visitorTeamResult: -1
            }
        }, { new: true });
    },
    closeGame: (root, args, context, info) => {
        return gameModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                endAt: Date.now()
            }
        }, { new: true });
    }
}