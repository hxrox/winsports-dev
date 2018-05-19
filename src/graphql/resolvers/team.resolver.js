import TeamModel from '../../models/team.model'

export default {
  teams: (root, args, context, info) => {
    if (args.searchTerm) {
      return TeamModel.find({ $text: { $search: args.searchTerm } })
    } else {
      return TeamModel.find()
    }
  },
  teamsByCountryId: (root, args, context, info) => {
    return TeamModel.find({ country: root._id })
  },
  teamsBySportId: (root, args, context, info) => {
    return TeamModel.find({ sport: root._id })
  },
  teamsByStadiumId: (root, args, context, info) => {
    return TeamModel.findOne({ stadium: root._id })
  },
  teamsByLeagueId: (root, args, context, info) => {
    return TeamModel.find({ leagues: root._id })
  },
  teamsByIds: (root, args, context, info) => {
    return TeamModel.find({ _id: { $in: root.teams } })
  },
  team: (root, args, context, info) => {
    if (root) {
      return TeamModel.findOne({ _id: root.team })
    } else {
      return TeamModel.findOne({ _id: args.id })
    }
  },
  teamByLocalTeam: (root, args, context, info) => {
    if (root) {
      return TeamModel.findOne({ _id: root.localTeam })
    } else {
      return TeamModel.findOne({ _id: args.id })
    }
  },
  teamByVisitorTeam: (root, args, context, info) => {
    if (root) {
      return TeamModel.findOne({ _id: root.visitorTeam })
    } else {
      return TeamModel.findOne({ _id: args.id })
    }
  },
  addTeam: (root, args, context, info) => {
    const model = new TeamModel(args)
    model.country = args.countryId
    model.sport = args.sportId
    model.stadium = args.stadiumId
    model.createdBy = context.user.id
    return model.save()
  },
  editTeam: (root, args, context, info) => {
    return TeamModel.findOneAndUpdate({ _id: args.id }, {
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
    }, { new: true })
  },
  trashTeam: (root, args, context, info) => {
    return TeamModel.findOneAndUpdate({ _id: args.id }, {
      $set: {
        deletedAt: Date.now(),
        updatedBy: context.user.id
      }
    }, { new: true })
  },
  recoverTeam: (root, args, context, info) => {
    return TeamModel.findOneAndUpdate({ _id: args.id }, {
      $set: {
        deletedAt: null,
        updatedBy: context.user.id
      }
    }, { new: true })
  },
  deleteTeam: (root, args, context, info) => {
    return TeamModel.findOneAndRemove({ _id: args.id }, { rawResult: true })
  }
}
