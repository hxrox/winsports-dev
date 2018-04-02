import sessionModel from '../../models/session.model';

export default {
    sessions: (root, { searchTerm }) => {
        if (searchTerm) {
            return sessionModel.find({ $text: { $search: searchTerm } }).populate('user').populate('application');
        } else {
            return sessionModel.find({}).populate('user').populate('application');
        }
    }
};