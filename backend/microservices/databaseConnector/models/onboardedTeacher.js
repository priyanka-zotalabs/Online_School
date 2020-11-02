require('../lib/dbHelper');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const onboardedTeacherSchema = new Schema({
    // userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    adminUserId: { type: Schema.Types.ObjectId, ref: 'admins' },
    adminId: { type: Schema.Types.ObjectId, ref: 'admins' },
    name: { type: String },
    email: { type: String },
    contactNumber: { type: String },
    status:{ type: String },
    // roleId: { type: Schema.Types.ObjectId, ref: 'roles', required: true },
},
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
        },
    });

const onboardedTeacher = mongoose.model('onboardedTeachers', onboardedTeacherSchema);

const addMultiple = (args, callback) => {
    onboardedTeacher.insertMany(args.onboardedTeacherDetails, { ordered: false })
        .then((res) => callback(null, res))
        .catch((err) => new Error(JSON.stringify(err)));
};

const find = (args, callback) => {
    onboardedTeacher.find(args.onboardedTeacherQueries)
        .populate('userId')
        .populate('onboardedTeacherInterview')
        .then((res) => callback(null, res))
        .catch((err) => new Error(JSON.stringify(err)));
};

const findOne = (args, callback) => {
    onboardedTeacher.findOne(args.onboardedTeacherQueries)
        .populate('userId')
        .populate('onboardedTeacherInterview')
        .then((res) => callback(null, res))
        .catch((err) => new Error(JSON.stringify(err)));
};

const update = (args, callback) => {
    onboardedTeacher.update(args.onboardedTeacherQueries, { $set: args.onboardedTeacherDetails })
        .then((res) => callback(null, res))
        .catch((err) => new Error(JSON.stringify(err)));
};
module.exports = {
    addMultiple,
    find,
    findOne,
    update,
};
