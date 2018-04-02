import moduleModel from '../../models/module.model';

export default {
    modules: (root, { searchTerm }) => {
        if (searchTerm) {
            return moduleModel.find({ $text: { $search: searchTerm } }).populate('application').populate('module');
        } else {
            return moduleModel.find().populate('application').populate('module');
        }
    },
    module: (root, { id }) => {
        return moduleModel.findOne({ _id: id }).populate('application').populate('module');
    },
    addModule: (root, args) => {
        const model = new moduleModel(args);
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
    }
}