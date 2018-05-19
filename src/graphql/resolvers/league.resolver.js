import LeagueModel from '../../models/league.model'

export default {
  leagues: (root, args, context, info) => {
    if (args.searchTerm) {
      return LeagueModel.find({ $text: { $search: args.searchTerm } })
    } else {
      return LeagueModel.find()
    }
  },
  leaguesByCountryId: (root, args, context, info) => {
    return LeagueModel.find({ country: root._id })
  },
  leaguesBySportId: (root, args, context, info) => {
    return LeagueModel.find({ sport: root._id })
  },
  leaguesByIds: (root, args, context, info) => {
    return LeagueModel.find({ _id: { $in: root.leagues } })
  },
  league: (root, args, context, info) => {
    if (root) {
      return LeagueModel.findOne({ _id: root.league })
    } else {
      return LeagueModel.findOne({ _id: args.id })
    }
  },
  addLeague: (root, args, context, info) => {
    const model = new LeagueModel(args)
    model.country = args.countryId
    model.sport = args.sportId
    model.createdBy = context.user.id
    return model.save()
  },
  editLeague: (root, args, context, info) => {
    return LeagueModel.findOneAndUpdate({ _id: args.id }, {
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
    }, { new: true })
  },
  trashLeague: (root, args, context, info) => {
    return LeagueModel.findOneAndUpdate({ _id: args.id }, {
      $set: {
        deletedAt: Date.now(),
        deletedBy: context.user.id
      }
    }, { new: true })
  },
  recoverLeague: (root, args, context, info) => {
    return LeagueModel.findOneAndUpdate({ _id: args.id }, {
      $set: {
        deletedAt: null,
        deletedBy: context.user.id
      }
    }, { new: true })
  },
  deleteLeague: (root, args, context, info) => {
    return LeagueModel.findOneAndRemove({ _id: args.id }, { rawResult: true })
  }
}
