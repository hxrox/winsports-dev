import bcrypt from 'bcrypt';

import userModel from '../../models/user.model';
import paymentMethodModel from '../../models/payment-method.model';
import emailSender from '../../utils/email-sender.utils';
import openPay from '../../utils/openpay.utils';

export default {
    users: (root, args, context, info) => {
        if (searchTerm) {
            return userModel.find({ $text: { $search: args.searchTerm } });
        } else {
            return userModel.find({});
        }
    },
    user: (root, args, context, info) => {
        return userModel.findOne({ _id: args.id });
    },
    userByEmailConfirmationToken: (root, args, context, info) => {
        return userModel.findOne({ emailConfirmationToken: args.token });
    },
    usersByActionId: (root, args, context, info) => {
        return userModel.find({ actions: root._id })
    },
    usersByRoleId: (root, args, context, info) => {
        return userModel.find({ roles: root._id })
    },
    addUser: (root, args, context, info) => {
        const model = new userModel(args);

        model.password = bcrypt.hashSync(args.password, bcrypt.genSaltSync(10));
        model.createdBy = context.user.id;

        return model.save();
    },
    editUser: (root, args, context, info) => {
        return userModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                name: args.name,
                lastName: args.lastName,
                userName: args.userName,
                email: args.email,
                birthDate: args.birthDate,
                actions: args.actions,
                roles: args.roles,
                updatedAt: new Date,
                updatedBy: context.user.id
            },
        }, { new: true });
    },
    trashUser: (root, args, context, info) => {
        return userModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                deletedAt: Date.now(),
                deletedBy: context.user.id
            }
        }, { new: true });
    },
    recoverUser: (root, args, context, info) => {
        return userModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                deletedAt: null,
                deletedBy: context.user.id
            }
        }, { new: true });
    },
    deleteUser: (root, args, context, info) => {
        return userModel.findOneAndRemove({ _id: args.id }, { rawResult: true });
    },
    userConfirmEmail: (root, args, context, info) => {
        return userModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                emailConfirmed: true
            }
        }, { new: true });
    },
    userChangePassword: (root, args, context, info) => {
        return userModel.findOneAndUpdate({ _id: context.user.id }, {
            $set: {
                password: bcrypt.hashSync(args.newPassword, bcrypt.genSaltSync(10))
            }
        }, { new: true });
    },
    userAddTeam: (root, args, context, info) => {
        return userModel.findOneAndUpdate({ _id: context.user.id }, {
            $push: {
                teams: args.teamId
            }
        }, { new: true });
    },
    userDeleteTeam: (root, args, context, info) => {
        return userModel.findOneAndUpdate({ _id: context.user.id }, {
            $pull: {
                teams: args.teamId
            }
        }, { new: true });
    },
    userAddBalance: (root, args, context, info) => {
        return userModel.findOneAndUpdate({ _id: context.user.id }, {
            $pull: {
                teams: args.teamId
            }
        }, { new: true });
    },
    userAddBalance: (root, args, context, info) => {
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
    addBalance: (root, args, context, info) => {
        var chargeRequest = {
            'method': 'card',
            'amount': args.balance,
            'description': 'Cargo inicial a mi cuenta',
            'order_id': 'oid-000511312',
            'customer': {
                'name': 'Juan',
                'last_name': 'Vazquez Juarez',
                'phone_number': '4423456723',
                'email': 'juan.vazquez@empresa.com.mx'
            },
            'send_email': false,
            'confirm': false,
            'redirect_url': 'http://www.openpay.mx/index.html'
        };
        openPay.charges.create(chargeRequest, (error, body) => {
            console.log(error)
            console.log(body)
        });
    }
}