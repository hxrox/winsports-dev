import stadiumModel from '../../models/stadium.model';

export default {
    stadiums: (root, { searchTerm }) => {
        if (searchTerm) {
            return stadiumModel.find({ $text: { $search: searchTerm } });
        } else {
            return stadiumModel.find();
        }
    },
    stadiumsByCountryId: (root, { searchTerm }) => {
        return stadiumModel.find({ country: root._id });
    },
    stadiumsBySportId: (root, { searchTerm }) => {
        return stadiumModel.find({ sport: root._id });
    },
    stadium: (root, { id }) => {
        if (root) {
            return stadiumModel.findOne({ _id: root.stadium });
        } else {
            return stadiumModel.findOne({ _id: id });
        }
    },
    addStadium: (root, args) => {
        const model = new stadiumModel(args);
        model.country = args.countryId;
        model.sport = args.sportId;
        model.createdAt = new Date;
        return model.save();
    },
    editStadium: (root, args) => {
        return stadiumModel.findOneAndUpdate({ _id: args.id }, {
            $set: {
                name: args.name,
                image: args.image,
                country: args.countryId,
                sport: args.sportId,
                active: args.active,
                updatedAt: Date.now()
            }
        }, { new: true });
    },
    deleteLogicStadium: (root, { id }) => {
        return stadiumModel.findOneAndUpdate({ _id: id }, {
            $set: {
                deletedAt: Date.now()
            }
        }, { new: true });
    },
    deleteStadium: (root, { id }) => {
        return stadiumModel.findOneAndRemove({ _id: id }, { rawResult: true });
    }
}