import applicationModel from '../../models/application.model';

export default {
    applications: (root, args, context, info) => {
        if (searchTerm) {
            return applicationModel.find({ $text: { $search: args.searchTerm } });
        } else {
            return applicationModel.find();
        }
    },
    applicationsByApplicationType: (root, args, context, info) => {
        return applicationModel.find({ applicationType: root._id });
    },
    application: (root, args, context, info) => {
        if (root) {
            return applicationModel.findOne({ _id: root.application });
        } else {
            return applicationModel.findOne({ _id: args.id });
        }
    },
    addApplication: (root, args, context, info) => {
        const model = new applicationModel(args);

        model.createdBy = context.user.id;

        return model.save();
    },
    editApplication: (root, args, context, info) => {
        return applicationModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                name: args.name,
                description: args.description,
                active: args.active,
                updatedAt: Date.now(),
                updatedBy: context.user.id
            }
        }, { new: true });
    },
    trashApplication: (root, args, context, info) => {
        return applicationModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                deletedAt: Date.now(),
                deletedBy: context.user.id
            }
        }, { new: true });
    },
    recoverApplication: (root, args, context, info) => {
        return applicationModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                deletedAt: null,
                deletedBy: context.user.id
            }
        }, { new: true });
    },
    deleteApplication: (root, args, context, info) => {
        return applicationModel.findOneAndRemove({ _id: args.id }, { rawResult: true });
    }
};