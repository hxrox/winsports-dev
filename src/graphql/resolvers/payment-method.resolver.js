import paymentMethodModel from '../../models/payment-method.model';

export default {
    paymentMethods: (root, args, context, info) => {
        if (searchTerm) {
            return paymentMethodModel.find({ $text: { $search: args.searchTerm } });
        } else {
            return paymentMethodModel.find();
        }
    },
    paymentMethod: (root, args, context, info) => {
        if (root) {
            return paymentMethodModel.findOne({ _id: root.paymentMethod });
        } else {
            return paymentMethodModel.findOne({ _id: args.id });
        }
    },
    addPaymentMethod: (root, args, context, info) => {
        const model = new paymentMethodModel(args);
        model.createdBy = context.user.id;
        return model.save();
    },
    editPaymentMethod: (root, args, context, info) => {
        return paymentMethodModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                name: args.name,
                icon: args.icon,
                iconIonic: args.iconIonic,
                active: args.active,
                updatedAt: Date.now(),
                updatedBy: context.user.id
            }
        }, { new: true });
    },
    trashPaymentMethod: (root, args, context, info) => {
        return paymentMethodModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                deletedAt: Date.now(),
                deletedBy: context.user.id
            }
        }, { new: true });
    },
    recoverPaymentMethod: (root, args, context, info) => {
        return paymentMethodModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                deletedAt: null,
                deletedBy: context.user.id
            }
        }, { new: true });
    },
    deletePaymentMethod: (root, args, context, info) => {
        return paymentMethodModel.findOneAndRemove({ _id: args.id }, { rawResult: true });
    }
}