import actionModel from '../../models/action.model';

export default {
    actions: (root, { searchTerm }) => {
        if (searchTerm) {
            return actionModel.find({ $text: { $search: searchTerm } });
        } else {
            return actionModel.find();
        }
    },
    actionsByModuleId: (root) => {
        return actionModel.find({ module: root._id });
    },
    actionsByIds: (root) => {
        return actionModel.find({ _id: { $in: root.actions }});
    },
    action: (root, { id }) => {
        if (root) {
            return actionModel.findOne({ _id: root.action });
        } else {
            return actionModel.findOne({ _id: id });
        }
    },
    addAction: (root, args) => {
        const model = new actionModel(args);

        model.createdAt = new Date;
        model.module = args.moduleId;

        return model.save();
    },
    editAction: (root, { id, name, description, moduleId, active }) => {
        return actionModel.findOneAndUpdate({ _id: id }, {
            $set: {
                name: name,
                description: description,
                module: moduleId,
                active: active,
                updatedAt: Date.now()
            }
        }, { new: true });
    },
    deleteLogicAction: (root, { id }) => {
        return actionModel.findOneAndUpdate({ _id: id }, {
            $set: {
                deletedAt: Date.now()
            }
        }, { new: true });
    },
    deleteAction: (root, { id }) => {
        return actionModel.findOneAndRemove({ _id: id }, { rawResult: true });
    }
}