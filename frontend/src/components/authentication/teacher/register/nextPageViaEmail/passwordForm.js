const passwordFormInit = {
  name: {
    value: "",
    validation: {
      required: {
        value: true,
        errMsg: "This field is required",
      },
      regex: {
        value: /^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/,
        errMsg: "Please enter full name with space",
      },
    },
    invalid: false,
    touched: false,
    helperText: "",
  },
  password: {
    value: "",
    validation: {
      required: {
        value: true,
        errMsg: "This field is required",
      },
      regex: {
        value: /^(?=^.{8,40}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        errMsg:
          "Password should contain 8 characters containing at least one uppercase, one numeric and one special character",
      },
    },
    invalid: false,
    touched: false,
    helperText: "",
  },
  confirmPassword: {
    value: "",
    validation: {
      required: {
        value: true,
        errMsg: "This field is required",
      },
      regex: {
        value: /^(?=^.{8,40}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        errMsg:
          "Password should contain 8 characters containing at least one uppercase, one numeric and one special character",
      },
    },
    invalid: false,
    touched: false,
    helperText: "",
  },
};

export default passwordFormInit;
