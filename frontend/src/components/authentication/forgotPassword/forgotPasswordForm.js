const forgotPasswordFormInit = {
    email: {
        value: "",
        validation: {
            required: {
                value: true,
                errMsg: "This field is required",
            },
            regex: {
                value: /^([a-zA-Z0-9_\-.+]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/,
                errMsg: "Enter valid email id",
            },
        },
        invalid: false,
        touched: false,
        helperText: "",
    }
}

export default forgotPasswordFormInit;