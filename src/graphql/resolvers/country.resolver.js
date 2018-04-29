import countryModel from '../../models/country.model';

export default {
    countries: (root, args, context, info) => {
        if (searchTerm) {
            return countryModel.find({ $text: { $search: args.searchTerm } });
        } else {
            return countryModel.find();
        }
    },
    country: (root, args, context, info) => {
        if (root) {
            return countryModel.findOne({ _id: root.country });
        } else {
            return countryModel.findOne({ _id: args.id });
        }
    },
    addCountry: (root, args, context, info) => {
        const model = new countryModel(args);
        model.createdBy = context.user.id;
        return model.save();
    },
    editCountry: (root, args, context, info) => {
        return countryModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                name: args.name,
                code: args.code,
                image: args.image,
                active: args.active,
                updatedAt: Date.now(),
                updatedBy: context.user.id
            }
        }, { new: true });
    },
    trashCountry: (root, args, context, info) => {
        return countryModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                deletedAt: Date.now(),
                deletedBy: context.user.id
            }
        }, { new: true });
    },
    recoverCountry: (root, args, context, info) => {
        return countryModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                deletedAt: null,
                deletedBy: context.user.id
            }
        }, { new: true });
    },
    deleteCountry: (root, args, context, info) => {
        return countryModel.findOneAndRemove({ _id: args.id }, { rawResult: true });
    }
}