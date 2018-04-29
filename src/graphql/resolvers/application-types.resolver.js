import applicationTypeModel from '../../models/application-types.model';

export default {
    applicationTypes: (root, args, context, info) => {
        if (searchTerm) {
            return applicationTypeModel.find({ $text: { $search: args.searchTerm } });
        } else {
            return applicationTypeModel.find();
        }
    },
    applicationType: (root, args, context, info) => {
        if (root) {
            return applicationTypeModel.findOne({ _id: root.applicationType });
        } else {
            return applicationTypeModel.findOne({ _id: args.id });
        }
    },
    addApplicationType: (root, args, context, info) => {
        const model = new applicationTypeModel(args);

        model.createdBy = context.user.id;

        return model.save();
    },
    editApplicationType: (root, args, context, info) => {
        return applicationTypeModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                name: args.name,
                description: args.description,
                active: args.active,
                updatedAt: Date.now(),
                updatedBy: context.user.id
            }
        }, { new: true });
    },
    trashApplicationType: (root, args, context, info) => {
        return applicationTypeModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                deletedAt: Date.now(),
                deletedBy: context.user.id
            }
        }, { new: true });
    },
    recoverApplicationType: (root, args, context, info) => {
        return applicationTypeModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                deletedAt: null,
                deletedBy: context.user.id
            }
        }, { new: true });
    },
    deleteApplicationType: (root, args, context, info) => {
        return applicationTypeModel.findOneAndRemove({ _id: args.id }, { rawResult: true });
    }
}