import sportModel from '../../models/sport.model';

export default {
    sports: (root, { searchTerm }) => {
        if (searchTerm) {
            return sportModel.find({ $text: { $search: searchTerm } });
        } else {
            return sportModel.find();
        }
    },
    sport: (root, { id }) => {
        if (root) {
            return sportModel.findOne({ _id: root.sport });
        } else {
            return sportModel.findOne({ _id: id });
        }
    },
    addSport: (root, args) => {
        const model = new sportModel(args);
        model.createdAt = new Date;
        return model.save();
    },
    editSport: (root, args) => {
        return sportModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                name: args.name,
                description: args.description,
                image: args.image,
                active: args.active,
                updatedAt: Date.now()
            }
        }, { new: true });
    },
    deleteLogicSport: (root, { id }) => {
        return sportModel.findOneAndUpdate({ _id: id }, {
            $set: {
                deletedAt: Date.now()
            }
        }, { new: true });
    },
    recoverSport: (root, args, context, info) => {
        return sportModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                deletedAt: null,
                deletedBy: null
            }
        }, { new: true });
    },
    deleteSport: (root, { id }) => {
        return sportModel.findOneAndRemove({ _id: id }, { rawResult: true });
    }
}