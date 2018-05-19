import CountryModel from '../../models/country.model'

export default {
  countries: (root, args, context, info) => {
    if (args.searchTerm) {
      return CountryModel.find({ $text: { $search: args.searchTerm } })
    } else {
      return CountryModel.find()
    }
  },
  country: (root, args, context, info) => {
    if (root) {
      return CountryModel.findOne({ _id: root.country })
    } else {
      return CountryModel.findOne({ _id: args.id })
    }
  },
  addCountry: (root, args, context, info) => {
    const model = new CountryModel(args)
    model.createdBy = context.user.id
    return model.save()
  },
  editCountry: (root, args, context, info) => {
    return CountryModel.findOneAndUpdate({ _id: args.id }, {
      $set: {
        name: args.name,
        code: args.code,
        image: args.image,
        active: args.active,
        updatedAt: Date.now(),
        updatedBy: context.user.id
      }
    }, { new: true })
  },
  trashCountry: (root, args, context, info) => {
    return CountryModel.findOneAndUpdate({ _id: args.id }, {
      $set: {
        deletedAt: Date.now(),
        deletedBy: context.user.id
      }
    }, { new: true })
  },
  recoverCountry: (root, args, context, info) => {
    return CountryModel.findOneAndUpdate({ _id: args.id }, {
      $set: {
        deletedAt: null,
        deletedBy: context.user.id
      }
    }, { new: true })
  },
  deleteCountry: (root, args, context, info) => {
    return CountryModel.findOneAndRemove({ _id: args.id }, { rawResult: true })
  }
}
