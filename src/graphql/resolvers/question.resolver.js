import questionModel from '../../models/question.model';

export default {
    questions: (root, { searchTerm }) => {
        if (searchTerm) {
            return questionModel.find({ $text: { $search: searchTerm } });
        } else {
            return questionModel.find();
        }
    },
    questionsBySportId: (root) => {
        return questionModel.find({ sport: root._id });
    },
    questionsByIds: (root) => {
        return questionModel.find({ _id: { $in: root.questions }});
    },
    question: (root, { id }) => {
        if (root) {
            return questionModel.findOne({ _id: root.question });
        } else {
            return questionModel.findOne({ _id: id });
        }
    },
    addQuestion: (root, args) => {
        const model = new questionModel(args);
        model.sport = args.sportId;
        model.createdAt = new Date;
        return model.save();
    },
    editQuestion: (root, args) => {
        return questionModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                name: args.name,
                point: args.point,
                sport: args.sportId,
                active: args.active,
                updatedAt: Date.now()
            }
        }, { new: true });
    },
    deleteLogicQuestion: (root, { id }) => {
        return questionModel.findOneAndUpdate({ _id: id }, {
            $set: {
                deletedAt: Date.now()
            }
        }, { new: true });
    },
    deleteQuestion: (root, { id }) => {
        return questionModel.findOneAndRemove({ _id: id }, { rawResult: true });
    }
}