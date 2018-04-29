import actionModel from '../../models/action.model';

export default {
    actions: (root, args, context, info) => {
        if (searchTerm) {
            return actionModel.find({ $text: { $search: args.searchTerm } });
        } else {
            return actionModel.find();
        }
    },
    actionsByModuleId: (root, args, context, info) => {
        return actionModel.find({ module: root._id });
    },
    actionsByIds: (root, args, context, info) => {
        return actionModel.find({ _id: { $in: root.actions } });
    },
    action: (root, args, context, info) => {
        if (root) {
            return actionModel.findOne({ _id: root.action });
        } else {
            return actionModel.findOne({ _id: args.id });
        }
    },
    addAction: (root, args, context, info) => {
        const model = new actionModel(args);

        model.createdAt = new Date;
        model.createdBy = context.user.id;
        model.module = args.moduleId;

        return model.save();
    },
    editAction: (root, args, context, info) => {
        return actionModel.findOneAndUpdate({ _id: id }, {
            $set: {
                name: args.name,
                description: args.description,
                module: args.moduleId,
                active: args.active,
                updatedAt: Date.now(),
                updatedBy: context.user.id
            }
        }, { new: true });
    },
    trashAction: (root, args, context, info) => {
        return actionModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                deletedAt: Date.now(),
                deletedBy: context.user.id
            }
        }, { new: true });
    },
    recoverAction: (root, args, context, info) => {
        return actionModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                deletedAt: null,
                deletedBy: context.user.id
            }
        }, { new: true });
    },
    deleteAction: (root, args, context, info) => {
        return actionModel.findOneAndRemove({ _id: args.id }, { rawResult: true });
    }
}