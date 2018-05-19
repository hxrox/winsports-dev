import SportModel from '../../models/sport.model'

export default {
  sports: (root, args, context, info) => {
    if (args.searchTerm) {
      return SportModel.find({ $text: { $search: args.searchTerm } })
    } else {
      return SportModel.find()
    }
  },
  sport: (root, args, context, info) => {
    if (root) {
      return SportModel.findOne({ _id: root.sport })
    } else {
      return SportModel.findOne({ _id: args.id })
    }
  },
  addSport: (root, args, context, info) => {
    const model = new SportModel(args)
    model.createdBy = context.user.id
    return model.save()
  },
  editSport: (root, args, context, info) => {
    return SportModel.findOneAndUpdate({ _id: args.id }, {
      $set: {
        name: args.name,
        description: args.description,
        image: args.image,
        active: args.active,
        updatedAt: Date.now(),
        updatedBy: context.user.id
      }
    }, { new: true })
  },
  trashSport: (root, args, context, info) => {
    return SportModel.findOneAndUpdate({ _id: args.id }, {
      $set: {
        deletedAt: Date.now(),
        deletedBy: context.user.id
      }
    }, { new: true })
  },
  recoverSport: (root, args, context, info) => {
    return SportModel.findOneAndUpdate({ _id: args.id }, {
      $set: {
        deletedAt: null,
        deletedBy: context.user.id
      }
    }, { new: true })
  },
  deleteSport: (root, args, context, info) => {
    return SportModel.findOneAndRemove({ _id: args.id }, { rawResult: true })
  }
}
