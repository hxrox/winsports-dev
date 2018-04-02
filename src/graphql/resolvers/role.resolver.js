import roleModel from '../../models/role.model';

export default {
    roles: (root, { searchTerm }) => {
        if (searchTerm) {
            return roleModel.find({ $text: { $search: searchTerm } });
        } else {
            return roleModel.find();
        }
    },
    role: (root, { id }) => {
        if (root) {
            return roleModel.findOne({ _id: root.role });
        } else {
            return roleModel.findOne({ _id: id });
        }
    },
    rolesByIds: (root) => {
        return roleModel.find({ _id: { $in: root.roles } });
    },
    rolesByActionId: (root) => {
        return roleModel.find({ actions: root._id });
    },
    addRole: (root, args) => {
        const model = new roleModel(args);
        model.application = args.applicationId;
        model.createdAt = new Date;
        return model.save();
    },
    editRole: (root, args) => {
        return roleModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                name: args.name,
                description: args.description,
                application: args.applicationId,
                active: args.active,
                actions: args.actions,
                updatedAt: Date.now()
            }
        }, { new: true });
    },
    deleteLogicRole: (root, { id }) => {
        return roleModel.findOneAndUpdate({ _id: id }, {
            $set: {
                deletedAt: Date.now()
            }
        }, { new: true });
    },
    deleteRole: (root, { id }) => {
        return roleModel.findOneAndRemove({ _id: id }, { rawResult: true });
    },
    rolesByApplicationId: (root) => {
        return roleModel.find({ application: root._id });
    }
}