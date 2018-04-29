import moduleModel from '../../models/module.model';

export default {
    modules: (root, args, context, info) => {
        if (args.searchTerm) {
            return moduleModel.find({ $text: { $search: args.searchTerm } });
        } else {
            return moduleModel.find();
        }
    },
    module: (root, args, context, info) => {
        if (root) {
            return moduleModel.findOne({ _id: root.module });
        } else {
            return moduleModel.findOne({ _id: args.id });
        }
    },
    addModule: (root, args, context, info) => {
        const model = new moduleModel(args);
        model.application = args.applicationId;
        model.createdBy = context.user.id;
        return model.save();
    },
    editModule: (root, args, context, info) => {
        return moduleModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                name: args.name,
                description: args.description,
                module: args.moduleId,
                application: args.applicationId,
                active: args.active,
                updatedAt: Date.now(),
                updatedBy: context.user.id
            }
        }, { new: true });
    },
    trashModule: (root, args, context, info) => {
        return moduleModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                deletedAt: Date.now(),
                deletedBy: context.user.id
            }
        }, { new: true });
    },
    recoverModule: (root, args, context, info) => {
        return moduleModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                deletedAt: null,
                deletedBy: context.user.id
            }
        }, { new: true });
    },
    deleteModule: (root, args, context, info) => {
        return moduleModel.findOneAndRemove({ _id: args.id }, { rawResult: true });
    },
    modulesByApplicationId: (root, args, context, info) => {
        return moduleModel.find({ application: root._id });
    }
}