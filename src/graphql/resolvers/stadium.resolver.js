import StadiumModel from '../../models/stadium.model'

export default {
  stadiums: (root, args, context, info) => {
    if (args.searchTerm) {
      return StadiumModel.find({ $text: { $search: args.searchTerm } })
    } else {
      return StadiumModel.find()
    }
  },
  stadiumsByCountryId: (root, args, context, info) => {
    return StadiumModel.find({ country: root._id })
  },
  stadiumsBySportId: (root, args, context, info) => {
    return StadiumModel.find({ sport: root._id })
  },
  stadium: (root, args, context, info) => {
    if (root) {
      return StadiumModel.findOne({ _id: root.stadium })
    } else {
      return StadiumModel.findOne({ _id: args.id })
    }
  },
  addStadium: (root, args, context, info) => {
    const model = new StadiumModel(args)
    model.country = args.countryId
    model.sport = args.sportId
    model.createdBy = context.user.id
    return model.save()
  },
  editStadium: (root, args, context, info) => {
    return StadiumModel.findOneAndUpdate({ _id: args.id }, {
      $set: {
        name: args.name,
        image: args.image,
        country: args.countryId,
        sport: args.sportId,
        active: args.active,
        updatedAt: Date.now(),
        updatedBy: context.user.id
      }
    }, { new: true })
  },
  trashStadium: (root, args, context, info) => {
    return StadiumModel.findOneAndUpdate({ _id: args.id }, {
      $set: {
        deletedAt: Date.now(),
        deletedBy: context.user.id
      }
    }, { new: true })
  },
  recoverStadium: (root, args, context, info) => {
    return StadiumModel.findOneAndUpdate({ _id: args.id }, {
      $set: {
        deletedAt: null,
        deletedBy: context.user.id
      }
    }, { new: true })
  },
  deleteStadium: (root, args, context, info) => {
    return StadiumModel.findOneAndRemove({ _id: args.id }, { rawResult: true })
  }
}
