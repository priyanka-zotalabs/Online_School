const passwordFormInit = {
  currentPassword: {
    value: "",
    validation: {
      required: {
        value: false,
        errMsg: "This field is required",
      },
    },
    invalid: false,
    touched: true,
    helperText: "",
  },
  newPassword: {
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
