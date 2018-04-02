import moduleModel from '../../models/module.model';

export default {
    modules: (root, { searchTerm }) => {
        if (searchTerm) {
            return moduleModel.find({ $text: { $search: searchTerm } });
        } else {
            return moduleModel.find();
        }
    },
    module: (root, { id }) => {
        if (root) {
            return moduleModel.findOne({ _id: root.module });
        } else {
            return moduleModel.findOne({ _id: id });
        }
    },
    addModule: (root, args) => {
        const model = new moduleModel(args);
        model.application = args.applicationId;
        model.createdAt = new Date;
        return model.save();
    },
    editModule: (root, { id, name, description, moduleId, applicationId, active }) => {
        return moduleModel.findOneAndUpdate({ _id: id }, {
            $set: {
                name: name,
                description: description,
                module: moduleId,
                application: applicationId,
                active: active,
                updatedAt: Date.now()
            }
        }, { new: true });
    },
    deleteLogicModule: (root, { id }) => {
        return moduleModel.findOneAndUpdate({ _id: id }, {
            $set: {
                deletedAt: Date.now()
            }
        }, { new: true });
    },
    deleteModule: (root, { id }) => {
        return moduleModel.findOneAndRemove({ _id: id }, { rawResult: true });
    },
    modulesByApplicationId: (root) => {
        return moduleModel.find({ application: root._id });
    }
}