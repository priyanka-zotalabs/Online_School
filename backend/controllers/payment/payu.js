// const randomstring = require("randomstring");
// const axios = require('axios');
var crypto = require('crypto');

const logger = require("../../lib/logger");
const { internalError, statusCode } = require("../../lib/constant");
var randomstring = require("randomstring");
const paymentDetailsModel = require("../../models/database/paymentDetails");
const paypal = require("@paypal/checkout-server-sdk");
const axios = require('axios');



var key = "gtKFFx";
var salt = "eCwWELxi";


const payuHash = (body) => new Promise((resolve, reject) => {
    try {
        logger.info(`payuHash - payuHash  generation started`);

        const txnid = "INVOICE-" + randomstring.generate();
        body.productinfo = body.course_name
        body.firstname = body.first_name
        bodstudentid = "StudeId-" + randomstring.generate();
        var cryp = crypto.createHash('sha512');
        var text = key + '|' + txnid + '|' + body.amount + '|' + body.productinfo + '|' + body.firstname + '|' + body.email + '|||||||||||' + salt;
        cryp.update(text);
        const hash = cryp.digest('hex');
        const RequestData = {
            key: key,
            txnid: txnid,
            hash: hash,
            amount: body.amount,
            firstname: body.firstname,
            email: body.email,
            phone: body.phone,
            productinfo: body.productinfo,
            surl: 'https://sucess-url.in',
            furl: 'https://fail-url.in',
            mode: 'dropout'
        }

        const success = {
            status: statusCode.Success,
            message: 'payuHash generate  successfully',
            data: RequestData
        };
        resolve(success);

    } catch (e) {
        logger.error(`payuHash - error while parsing the body ${e}`);
        const errObj = {
            status: statusCode.InvalidData,
            message: e.message,
        };
        reject(errObj);
    }
})


module.exports = {
    payuHash,
};

