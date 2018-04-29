import roleModel from '../../models/role.model';

export default {
    roles: (root, args, context, info) => {
        if (args.searchTerm) {
            return roleModel.find({ $text: { $search: args.searchTerm } });
        } else {
            return roleModel.find();
        }
    },
    role: (root, args, context, info) => {
        if (root) {
            return roleModel.findOne({ _id: root.role });
        } else {
            return roleModel.findOne({ _id: args.id });
        }
    },
    rolesByIds: (root, args, context, info) => {
        return roleModel.find({ _id: { $in: root.roles } });
    },
    rolesByActionId: (root, args, context, info) => {
        return roleModel.find({ actions: root._id });
    },
    addRole: (root, args, context, info) => {
        const model = new roleModel(args);
        model.application = args.applicationId;
        model.createdBy = context.user.id;
        return model.save();
    },
    editRole: (root, args, context, info) => {
        return roleModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                name: args.name,
                description: args.description,
                application: args.applicationId,
                active: args.active,
                actions: args.actions,
                updatedAt: Date.now(),
                updatedBy: context.user.id
            }
        }, { new: true });
    },
    trashRole: (root, args, context, info) => {
        return roleModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                deletedAt: Date.now(),
                deletedBy: context.user.id
            }
        }, { new: true });
    },
    recoverRole: (root, args, context, info) => {
        return roleModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                deletedAt: Date.now(),
                deletedBy: context.user.id
            }
        }, { new: true });
    },
    deleteRole: (root, args, context, info) => {
        return roleModel.findOneAndRemove({ _id: args.id }, { rawResult: true });
    },
    rolesByApplicationId: (root, args, context, info) => {
        return roleModel.find({ application: root._id });
    }
}