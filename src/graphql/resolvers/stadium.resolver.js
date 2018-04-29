import stadiumModel from '../../models/stadium.model';

export default {
    stadiums: (root, args, context, info) => {
        if (searchTerm) {
            return stadiumModel.find({ $text: { $search: args.searchTerm } });
        } else {
            return stadiumModel.find();
        }
    },
    stadiumsByCountryId: (root, args, context, info) => {
        return stadiumModel.find({ country: root._id });
    },
    stadiumsBySportId: (root, args, context, info) => {
        return stadiumModel.find({ sport: root._id });
    },
    stadium: (root, args, context, info) => {
        if (root) {
            return stadiumModel.findOne({ _id: root.stadium });
        } else {
            return stadiumModel.findOne({ _id: args.id });
        }
    },
    addStadium: (root, args, context, info) => {
        const model = new stadiumModel(args);
        model.country = args.countryId;
        model.sport = args.sportId;
        model.createdBy = context.user.id;
        return model.save();
    },
    editStadium: (root, args, context, info) => {
        return stadiumModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                name: args.name,
                image: args.image,
                country: args.countryId,
                sport: args.sportId,
                active: args.active,
                updatedAt: Date.now(),
                updatedBy: context.user.id
            }
        }, { new: true });
    },
    trashStadium: (root, args, context, info) => {
        return stadiumModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                deletedAt: Date.now(),
                deletedBy: context.user.id
            }
        }, { new: true });
    },
    recoverStadium: (root, args, context, info) => {
        return stadiumModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                deletedAt: null,
                deletedBy: context.user.id
            }
        }, { new: true });
    },
    deleteStadium: (root, args, context, info) => {
        return stadiumModel.findOneAndRemove({ _id: args.id }, { rawResult: true });
    }
}