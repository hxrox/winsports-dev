import ApplicationModel from '../../models/application.model'

export default {
  applications: (root, args, context, info) => {
    if (args.searchTerm) {
      return ApplicationModel.find({ $text: { $search: args.searchTerm } })
    } else {
      return ApplicationModel.find()
    }
  },
  applicationsByApplicationType: (root, args, context, info) => {
    return ApplicationModel.find({ applicationType: root._id })
  },
  application: (root, args, context, info) => {
    if (root) {
      return ApplicationModel.findOne({ _id: root.application })
    } else {
      return ApplicationModel.findOne({ _id: args.id })
    }
  },
  addApplication: (root, args, context, info) => {
    const model = new ApplicationModel(args)

    model.createdBy = context.user.id

    return model.save()
  },
  editApplication: (root, args, context, info) => {
    return ApplicationModel.findOneAndUpdate({ _id: args.id }, {
      $set: {
        name: args.name,
        description: args.description,
        active: args.active,
        updatedAt: Date.now(),
        updatedBy: context.user.id
      }
    }, { new: true })
  },
  trashApplication: (root, args, context, info) => {
    return ApplicationModel.findOneAndUpdate({ _id: args.id }, {
      $set: {
        deletedAt: Date.now(),
        deletedBy: context.user.id
      }
    }, { new: true })
  },
  recoverApplication: (root, args, context, info) => {
    return ApplicationModel.findOneAndUpdate({ _id: args.id }, {
      $set: {
        deletedAt: null,
        deletedBy: context.user.id
      }
    }, { new: true })
  },
  deleteApplication: (root, args, context, info) => {
    return ApplicationModel.findOneAndRemove({ _id: args.id }, { rawResult: true })
  }
}
