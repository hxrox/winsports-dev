import ApplicationTypeModel from '../../models/application-types.model'

export default {
  applicationTypes: (root, args, context, info) => {
    if (args.searchTerm) {
      return ApplicationTypeModel.find({ $text: { $search: args.searchTerm } })
    } else {
      return ApplicationTypeModel.find()
    }
  },
  applicationType: (root, args, context, info) => {
    if (root) {
      return ApplicationTypeModel.findOne({ _id: root.applicationType })
    } else {
      return ApplicationTypeModel.findOne({ _id: args.id })
    }
  },
  addApplicationType: (root, args, context, info) => {
    const model = new ApplicationTypeModel(args)

    model.createdBy = context.user.id

    return model.save()
  },
  editApplicationType: (root, args, context, info) => {
    return ApplicationTypeModel.findOneAndUpdate({ _id: args.id }, {
      $set: {
        name: args.name,
        description: args.description,
        active: args.active,
        updatedAt: Date.now(),
        updatedBy: context.user.id
      }
    }, { new: true })
  },
  trashApplicationType: (root, args, context, info) => {
    return ApplicationTypeModel.findOneAndUpdate({ _id: args.id }, {
      $set: {
        deletedAt: Date.now(),
        deletedBy: context.user.id
      }
    }, { new: true })
  },
  recoverApplicationType: (root, args, context, info) => {
    return ApplicationTypeModel.findOneAndUpdate({ _id: args.id }, {
      $set: {
        deletedAt: null,
        deletedBy: context.user.id
      }
    }, { new: true })
  },
  deleteApplicationType: (root, args, context, info) => {
    return ApplicationTypeModel.findOneAndRemove({ _id: args.id }, { rawResult: true })
  }
}
