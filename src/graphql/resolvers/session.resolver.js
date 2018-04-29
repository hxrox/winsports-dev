import sessionModel from '../../models/session.model';

export default {
    sessions: (root, args, context, info) => {
        if (args.searchTerm) {
            return sessionModel.find({ $text: { $search: args.searchTerm } }).populate('user').populate('application');
        } else {
            return sessionModel.find({}).populate('user').populate('application');
        }
    }
};