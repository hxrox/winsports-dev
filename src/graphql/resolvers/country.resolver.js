import countryModel from '../../models/country.model';

export default {
    countries: (root, { searchTerm }) => {
        if (searchTerm) {
            return countryModel.find({ $text: { $search: searchTerm } });
        } else {
            return countryModel.find();
        }
    },
    country: (root, { id }) => {
        if (root) {
            return countryModel.findOne({ _id: root.country });
        } else {
            return countryModel.findOne({ _id: id });
        }
    },
    addCountry: (root, args) => {
        const model = new countryModel(args);
        model.createdAt = new Date;
        return model.save();
    },
    editCountry: (root, args) => {
        return countryModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                name: args.name,
                code: args.code,
                image: args.image,
                active: args.active,
                updatedAt: Date.now()
            }
        }, { new: true });
    },
    deleteLogicCountry: (root, { id }) => {
        return countryModel.findOneAndUpdate({ _id: id }, {
            $set: {
                deletedAt: Date.now()
            }
        }, { new: true });
    },
    recoverCountry: (root, args, context, info) => {
        return countryModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                deletedAt: null,
                deletedBy: null
            }
        }, { new: true });
    },
    deleteCountry: (root, { id }) => {
        return countryModel.findOneAndRemove({ _id: id }, { rawResult: true });
    }
}