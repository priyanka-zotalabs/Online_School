const otpFormInit = {
    otp: {
        value: "",
        validation: {
            required: {
                value: true,
                errMsg: "This field is required",
            },
            regex: {
                value: /^([0-9]{4})$/,
                errMsg: "OTP is 4 digits number",
            },
        },
        invalid: false,
        touched: false,
        helperText: "",
    }
}

export default otpFormInit;