import SessionModel from '../../models/session.model'

export default {
  sessions: (root, args, context, info) => {
    if (args.searchTerm) {
      return SessionModel.find({ $text: { $search: args.searchTerm } }).populate('user').populate('application')
    } else {
      return SessionModel.find({}).populate('user').populate('application')
    }
  }
}
