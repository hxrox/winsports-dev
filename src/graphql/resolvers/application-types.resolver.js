import applicationTypeModel from '../../models/application-types.model';

export default {
    applicationTypes: (root, { searchTerm }) => {
        if (searchTerm) {
            return applicationTypeModel.find({ $text: { $search: searchTerm } });
        } else {
            return applicationTypeModel.find();
        }
    },
    applicationType: (root, { id }) => {
        if (root) {
            return applicationTypeModel.findOne({ _id: root.applicationType });
        } else {
            return applicationTypeModel.findOne({ _id: id });
        }
    },
    addApplicationType: (root, args) => {
        const model = new applicationTypeModel(args);
        return model.save();
    },
    editApplicationType: (root, { id, name, description, active }) => {
        return applicationTypeModel.findOneAndUpdate({ _id: id }, {
            $set: {
                name: name,
                description: description,
                active: active,
                updatedAt: Date.now()
            }
        }, { new: true });
    },
    deleteLogicApplicationType: (root, { id }) => {
        return applicationTypeModel.findOneAndUpdate({ _id: id }, {
            $set: {
                deletedAt: Date.now()
            }
        }, { new: true });
    },
    deleteApplicationType: (root, { id }) => {
        return applicationTypeModel.findOneAndRemove({ _id: id }, { rawResult: true });
    }
}