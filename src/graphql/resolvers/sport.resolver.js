import sportModel from '../../models/sport.model';

export default {
    sports: (root, args, context, info) => {
        if (searchTerm) {
            return sportModel.find({ $text: { $search: args.searchTerm } });
        } else {
            return sportModel.find();
        }
    },
    sport: (root, args, context, info) => {
        if (root) {
            return sportModel.findOne({ _id: root.sport });
        } else {
            return sportModel.findOne({ _id: args.id });
        }
    },
    addSport: (root, args, context, info) => {
        const model = new sportModel(args);
        model.createdBy = context.user.id;
        return model.save();
    },
    editSport: (root, args, context, info) => {
        return sportModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                name: args.name,
                description: args.description,
                image: args.image,
                active: args.active,
                updatedAt: Date.now(),
                updatedBy: context.user.id
            }
        }, { new: true });
    },
    trashSport: (root, args, context, info) => {
        return sportModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                deletedAt: Date.now(),
                deletedBy: context.user.id
            }
        }, { new: true });
    },
    recoverSport: (root, args, context, info) => {
        return sportModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                deletedAt: null,
                deletedBy: context.user.id
            }
        }, { new: true });
    },
    deleteSport: (root, args, context, info) => {
        return sportModel.findOneAndRemove({ _id: args.id }, { rawResult: true });
    }
}