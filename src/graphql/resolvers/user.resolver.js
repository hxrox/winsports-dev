import bcrypt from 'bcrypt';

import userModel from '../../models/user.model';
import paymentMethodModel from '../../models/payment-method.model';
import emailSender from '../../utils/email-sender.utils';

export default {
    users: (root, { searchTerm }) => {
        if (searchTerm) {
            return userModel.find({ $text: { $search: searchTerm } });
        } else {
            return userModel.find({});
        }
    },
    user: (root, { id }) => {
        return userModel.findOne({ _id: id });
    },
    userByEmailConfirmationToken: (root, { token }) => {
        return userModel.findOne({ emailConfirmationToken: token });
    },
    usersByActionId: (root) => {
        return userModel.find({ actions: root._id })
    },
    usersByRoleId: (root) => {
        return userModel.find({ roles: root._id })
    },
    addUser: (root, args) => {
        const model = new userModel(args);

        model.password = bcrypt.hashSync(args.password, bcrypt.genSaltSync(10));
        model.createdAt = new Date;

        return model.save();
    },
    editUser: (root, args) => {
        return userModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                name: args.name,
                lastName: args.lastName,
                userName: args.userName,
                email: args.email,
                birthDate: args.birthDate,
                actions: args.actions,
                roles: args.roles,
                updatedAt: new Date
            },
        }, { new: true });
    },
    deleteLogicUser: (root, { id }) => {
        return userModel.findOneAndUpdate({ _id: id }, {
            $set: {
                deletedAt: Date.now()
            }
        }, { new: true });
    },
    deleteUser: (root, { id }) => {
        return userModel.findOneAndRemove({ _id: id }, { rawResult: true });
    },
    userConfirmEmail: (root, { id }) => {
        return userModel.findOneAndUpdate({ _id: id }, {
            $set: {
                emailConfirmed: true
            }
        }, { new: true });
    },
    userChangePassword: (root, { id, passwordCurrent, newPassword, confirmPassword }) => {
        return userModel.findOneAndUpdate({ _id: id }, {
            $set: {
                password: bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10))
            }
        }, { new: true });
    },
    userAddTeam: (root, args, context) => {
        return userModel.findOneAndUpdate({ _id: context.user.id }, {
            $push: {
                teams: args.teamId
            }
        }, { new: true });
    },
    userDeleteTeam: (root, args, context) => {
        return userModel.findOneAndUpdate({ _id: context.user.id }, {
            $pull: {
                teams: args.teamId
            }
        }, { new: true });
    },
    userAddBalance: (root, arg, context) => {
        return userModel.findOneAndUpdate({ _id: context.user.id }, {
            $pull: {
                teams: args.teamId
            }
        }, { new: true });
    },
    userAddBalance: (root, args, context) => {
        return userModel.findOne({ _id: context.user.id }).then(user => {
            console.log(user);
        });
    },
    registerUser: (root, args, context, info) => {
        const model = new userModel(args);

        model.password = bcrypt.hashSync(args.password, bcrypt.genSaltSync(10));
        model.createdAt = new Date;

        return paymentMethodModel.find().then(paymentMethods => {

            model.balances = [];

            paymentMethods.forEach(paymentMethod => {
                model.balances.push({
                    paymentMethod: paymentMethod._id,
                    balance: 0
                });
            });

            return model.save().then(modelSaved => {

                emailSender.sendMail({
                    from: '"WinSports" <noreply@example.com>', // sender address
                    to: model.email, // list of receivers
                    subject: 'Confirmación de email', // Subject line
                    text: 'Hola usuario favor de verificar tu correo electronico.', // plain text body
                    html: '<b>Hola usuario favor de verificar tu correo electronico.</b>' // html body
                }).then(success => {
                });

                return modelSaved;
            });
        });
    },
}