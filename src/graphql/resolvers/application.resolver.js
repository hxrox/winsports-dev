import applicationModel from '../../models/application.model';

export default {
    applications: (root, { searchTerm }) => {
        if (searchTerm) {
            return applicationModel.find({ $text: { $search: searchTerm } });
        } else {
            return applicationModel.find();
        }
    },
    applicationsByApplicationType: (root) => {
        return applicationModel.find({ applicationType: root._id });
    },
    application: (root, { id }) => {
        if (root) {
            return applicationModel.findOne({ _id: root.application });
        } else {
            return applicationModel.findOne({ _id: id });
        }
    },
    addApplication: (root, args) => {
        const model = new applicationModel(args);
        return model.save();
    },
    editApplication: (root, { id, name, description, active }) => {
        return applicationModel.findOneAndUpdate({ _id: id }, {
            $set: {
                name: name,
                description: description,
                active: active,
                updatedAt: Date.now()
            }
        }, { new: true });
    },
    deleteLogicApplication: (root, { id }) => {
        return applicationModel.findOneAndUpdate({ _id: id }, {
            $set: {
                deletedAt: Date.now()
            }
        }, { new: true });
    },
    deleteApplication: (root, { id }) => {
        return applicationModel.findOneAndRemove({ _id: id }, { rawResult: true });
    }
};