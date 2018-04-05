import paymentMethodModel from '../../models/payment-method.model';

export default {
    paymentMethods: (root, { searchTerm }) => {
        if (searchTerm) {
            return paymentMethodModel.find({ $text: { $search: searchTerm } });
        } else {
            return paymentMethodModel.find();
        }
    },
    paymentMethod: (root, { id }) => {
        if (root) {
            return paymentMethodModel.findOne({ _id: root.paymentMethod });
        } else {
            return paymentMethodModel.findOne({ _id: id });
        }
    },
    addPaymentMethod: (root, args) => {
        const model = new paymentMethodModel(args);
        model.createdAt = new Date;
        return model.save();
    },
    editPaymentMethod: (root, args) => {
        return paymentMethodModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                name: args.name,
                icon: args.icon,
                iconIonic: args.iconIonic,
                active: args.active,
                updatedAt: Date.now()
            }
        }, { new: true });
    },
    deleteLogicPaymentMethod: (root, { id }) => {
        return paymentMethodModel.findOneAndUpdate({ _id: id }, {
            $set: {
                deletedAt: Date.now()
            }
        }, { new: true });
    },
    deletePaymentMethod: (root, { id }) => {
        return paymentMethodModel.findOneAndRemove({ _id: id }, { rawResult: true });
    }
}