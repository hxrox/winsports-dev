import userModel from '../../models/user.model';
import bcrypt from 'bcrypt';

export default {
    users: (root, { searchTerm }) => {
        if (searchTerm) {
            return userModel.find({ $text: { $search: searchTerm } }).populate('actions');
        } else {
            return userModel.find({}).populate('actions');
        }
    },
    user: (root, { id }) => {
        return userModel.findOne({ _id: id }).populate('actions');
    },
    userByEmailConfirmationToken: (root, { token }) => {
        return userModel.findOne({ emailConfirmationToken: token }).populate('actions');
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
    }
}