import QuestionModel from '../../models/question.model'

export default {
  questions: (root, args, context, info) => {
    if (args.searchTerm) {
      return QuestionModel.find({ $text: { $search: args.searchTerm } })
    } else {
      return QuestionModel.find()
    }
  },
  questionsBySportId: (root, args, context, info) => {
    return QuestionModel.find({ sport: root._id })
  },
  questionsByIds: (root, args, context, info) => {
    return QuestionModel.find({ _id: { $in: root.questions } })
  },
  question: (root, args, context, info) => {
    if (root) {
      return QuestionModel.findOne({ _id: root.question })
    } else {
      return QuestionModel.findOne({ _id: args.id })
    }
  },
  addQuestion: (root, args, context, info) => {
    const model = new QuestionModel(args)
    model.sport = args.sportId
    model.createdBy = context.user.id
    return model.save()
  },
  editQuestion: (root, args, context, info) => {
    return QuestionModel.findOneAndUpdate({ _id: args.id }, {
      $set: {
        name: args.name,
        point: args.point,
        sport: args.sportId,
        active: args.active,
        updatedAt: Date.now(),
        updatedBy: context.user.id
      }
    }, { new: true })
  },
  trashQuestion: (root, args, context, info) => {
    return QuestionModel.findOneAndUpdate({ _id: args.id }, {
      $set: {
        deletedAt: Date.now(),
        deletedBy: context.user.id
      }
    }, { new: true })
  },
  recoverQuestion: (root, args, context, info) => {
    return QuestionModel.findOneAndUpdate({ _id: args.id }, {
      $set: {
        deletedAt: null,
        deletedBy: context.user.id
      }
    }, { new: true })
  },
  deleteQuestion: (root, args, context, info) => {
    return QuestionModel.findOneAndRemove({ _id: args.id }, { rawResult: true })
  }
}
