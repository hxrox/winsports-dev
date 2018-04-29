import questionModel from '../../models/question.model';

export default {
    questions: (root, args, context, info) => {
        if (args.searchTerm) {
            return questionModel.find({ $text: { $search: args.searchTerm } });
        } else {
            return questionModel.find();
        }
    },
    questionsBySportId: (root, args, context, info) => {
        return questionModel.find({ sport: root._id });
    },
    questionsByIds: (root, args, context, info) => {
        return questionModel.find({ _id: { $in: root.questions } });
    },
    question: (root, args, context, info) => {
        if (root) {
            return questionModel.findOne({ _id: root.question });
        } else {
            return questionModel.findOne({ _id: args.id });
        }
    },
    addQuestion: (root, args, context, info) => {
        const model = new questionModel(args);
        model.sport = args.sportId;
        model.createdBy = context.user.id;
        return model.save();
    },
    editQuestion: (root, args, context, info) => {
        return questionModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                name: args.name,
                point: args.point,
                sport: args.sportId,
                active: args.active,
                updatedAt: Date.now(),
                updatedBy: context.user.id
            }
        }, { new: true });
    },
    trashQuestion: (root, args, context, info) => {
        return questionModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                deletedAt: Date.now(),
                deletedBy: context.user.id
            }
        }, { new: true });
    },
    recoverQuestion: (root, args, context, info) => {
        return questionModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                deletedAt: null,
                deletedBy: context.user.id
            }
        }, { new: true });
    },
    deleteQuestion: (root, args, context, info) => {
        return questionModel.findOneAndRemove({ _id: args.id }, { rawResult: true });
    }
}