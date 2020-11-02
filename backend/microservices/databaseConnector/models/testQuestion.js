require("../lib/dbHelper");
const mongoose = require("mongoose");

const { Schema } = mongoose;

const testQuestionSchema = new Schema(
    {
        teacherId: { type: Schema.Types.ObjectId, ref: 'teachers', required: true, },
        instituteId: { type: Schema.Types.ObjectId, ref: 'institutes', required: true, },
        testTitle: { type: String, required: true },
        testDescription: { type: String, required: true },
        totalQuestions: { type: String, require: true },
        totalTime: { type: String, require: true },
        totalMarks: { type: String, require: true },
        subject: { type: String, require: true },
        questions: [
            {
                qId: { type: String, require: true },
                question: { type: String, require: true },
                numberOfOptions: { type: String, require: true },
                marks: { type: String, require: true },
                options: [
                    {
                        option: { type: String, require: true },
                        value: { type: String, require: true },

                    },
                ],
                correctAnswer: { type: String, require: true },
                explanation: { type: String },
            },],
    },
    {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt",
        },
    }
);

const testQuestion = mongoose.model(
    "testQuestions",
    testQuestionSchema
);

const addMultiple = (args, callback) => {
    testQuestion.insertMany(args.testQuestionDetails, { ordered: false })
        .then((res) => {
            callback(null, res)
        })
        .catch((err) => {
            new Error(JSON.stringify(err))
        });
};

const find = (args, callback) => {
    testQuestion.find(args.testQuestionQueries)
        .then((res) => callback(null, res))
        .catch((err) => new Error(JSON.stringify(err)));
};

const findOne = (args, callback) => {
    testQuestion.findOne(args.testQuestionQueries)
        .then((res) => {
            callback(null, res)
        })
        .catch((err) => {
            new Error(JSON.stringify(err))
        });
};

const update = (args, callback) => {
    testQuestion.update(
        args.testQuestionQueries,
        { $set: args.testQuestionDetails },
        { upsert: true }
    )
        .then((res) => {
            callback(null, res)
        })
        .catch((err) => {

            new Error(JSON.stringify(err))
        }
        );
};

const deleteOne = (args, callback) => {
    testQuestion.deleteOne(args.testQuestionQueries)
        .then((res) => callback(null, res))
        .catch((err) => new Error(JSON.stringify(err)));
};

const updateQuestion = (args, callback) => {
    testQuestion.update(
        args.testQuestionQueries,
        { $set: { "questions.$": args.testQuestionDetails } },
        { upsert: true }
    )
        .then((res) => {
            callback(null, res)
        })
        .catch((err) => {

            new Error(JSON.stringify(err))
        }
        );
};

const deleteQuestion = (args, callback) => {
    testQuestion.update(
        args.testQuestionQueries,
        { $pull: { "questions": args.testQuestionDetails } },
        { new: true }
    )
        .then((res) => {
            callback(null, res)
        })
        .catch((err) => {

            new Error(JSON.stringify(err))
        }
        );
};


const findInstituteTest = (args, callback) => {
    testQuestion.find(args.testQuestionQueries)
        .populate('teacherId','name')
        .then((res) => callback(null, res))
        .catch((err) => new Error(JSON.stringify(err)));
};

module.exports = {
    addMultiple,
    find,
    findOne,
    update,
    deleteOne,
    updateQuestion,
    deleteQuestion,
    findInstituteTest
};
