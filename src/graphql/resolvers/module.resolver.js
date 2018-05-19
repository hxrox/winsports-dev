import ModuleModel from '../../models/module.model'

export default {
  modules: (root, args, context, info) => {
    if (args.searchTerm) {
      return ModuleModel.find({ $text: { $search: args.searchTerm } })
    } else {
      return ModuleModel.find()
    }
  },
  module: (root, args, context, info) => {
    if (root) {
      return ModuleModel.findOne({ _id: root.module })
    } else {
      return ModuleModel.findOne({ _id: args.id })
    }
  },
  addModule: (root, args, context, info) => {
    const model = new ModuleModel(args)
    model.application = args.applicationId
    model.createdBy = context.user.id
    return model.save()
  },
  editModule: (root, args, context, info) => {
    return ModuleModel.findOneAndUpdate({ _id: args.id }, {
      $set: {
        name: args.name,
        description: args.description,
        module: args.moduleId,
        application: args.applicationId,
        active: args.active,
        updatedAt: Date.now(),
        updatedBy: context.user.id
      }
    }, { new: true })
  },
  trashModule: (root, args, context, info) => {
    return ModuleModel.findOneAndUpdate({ _id: args.id }, {
      $set: {
        deletedAt: Date.now(),
        deletedBy: context.user.id
      }
    }, { new: true })
  },
  recoverModule: (root, args, context, info) => {
    return ModuleModel.findOneAndUpdate({ _id: args.id }, {
      $set: {
        deletedAt: null,
        deletedBy: context.user.id
      }
    }, { new: true })
  },
  deleteModule: (root, args, context, info) => {
    return ModuleModel.findOneAndRemove({ _id: args.id }, { rawResult: true })
  },
  modulesByApplicationId: (root, args, context, info) => {
    return ModuleModel.find({ application: root._id })
  }
}
