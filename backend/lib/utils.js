const bcrypt = require('bcrypt');
const config = require('../config/index');
const studentModel = require('../models/database/student');
const adminModel = require('../models/database/admin');
const teacherModel = require('../models/database/teacher');
const randomString = require('randomstring');
const crypto = require("crypto");

const generateBcryptHash = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};

const compareHash = (password, hash) => bcrypt.compareSync(password, hash);

const getUserModel = (code) => {
    let model;
    switch (code) {
        case config.role.STUDENT:
            model = studentModel;
            break;
        case config.role.ADMIN:
            model = adminModel;
            break;
        case config.role.TEACHER:
            model = teacherModel;
            break;
        default:
            model = studentModel;
    }
    return model;
}
const toTitleCase = (str) => {
    const strArr = str.toLowerCase().split(' ');
    const final = [];
    strArr.forEach((word) => {
        final.push(word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    });
    return final.join(' ');
};

const generateRandomString = (length) => randomString.generate({
    length: length || 12,
    charset: 'alphanumeric',
});
const generateToken = () => {
    return crypto.randomBytes(20).toString('hex')
};

const generateOTP = (length) => randomString.generate({
    length: length || 4,
    charset: 'numeric',
});

const validateName = (name) => {
    if (name.length == 0) {
        return "Empty name field."
    }
    if (name.length > 0 && name.length < 50) {
        let regex = /^[\sa-zA-Z\s]+(\s[a-zA-Z\s]+)?$/i;
        if (!regex.test(name)) {
            return "The name field should only contain alphabets."
        }
    } else {
        return "Minimum length for name should be 1 and maximum should be 50."
    }
    return "";
}

const validateEmail = (email) => {
    // if (email.length == 0) {
    //     return "Empty email field."
    // }
    if (email.length > 0 && email.length < 64) {
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!regex.test(email)) {
            return "The email field has invalid email id."
        }
    } else if (email.lenth > 64){
        return "Minimum length for email id should be 1 and maximum should be 64."
    }
    return "";
}

const validatePhoneNumber = (phoneNumber) => {
    if (phoneNumber.length == 0) {
        return "Empty contact number field.";
    }
    if (phoneNumber.length > 0) {
        let regex = /^\d+$/;
        if (!regex.test(phoneNumber)) {
            return "The contact number field should only contain numerical.";
        }
    }
    return "";
}

const validateSchoolName = (name) => {
    if (name.length == 0) {
        return "Empty school name field."
    }
    if (name.length > 0 && name.length < 50) {
        let regex = /^[a-z0-9]+$/i;
        if (!regex.test(name)) {
            return "The school name field should only contain alphabets and numbers."
        }
    } else {
        return "Minimum length for school name should be 1 and maximum should be 50."
    }
    return "";
}

const validateBoard = (name) => {
    if (name.length == 0) {
        return "Empty board field."
    }
    if (name.length > 0 && name.length < 50) {
        let regex = /^[\sa-zA-Z\s]+$/i;
        if (!regex.test(name)) {
            return "The board field should only contain alphabets."
        }
    } else {
        return "Minimum length for board should be 1 and maximum should be 50."
    }
    return "";
}

module.exports = {
    compareHash,
    generateBcryptHash,
    getUserModel,
    toTitleCase,
    generateRandomString,
    generateToken,
    generateOTP,
    validateEmail,
    validatePhoneNumber,
    validateName,
    validateSchoolName,
    validateBoard
}