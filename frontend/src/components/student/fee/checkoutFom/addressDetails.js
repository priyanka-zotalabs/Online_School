const addressDetailsInit = {
  first_name: {
    value: "",
    validation: {
      required: {
        value: true,
        errMsg: "This field is required",
      },
      alpha: {
        value: "",
        errMsg: "Enter valid first name",
      },
    },
    invalid: false,
    touched: false,
    helperText: "",
  },
  last_name: {
    value: "",
    validation: {
      required: {
        value: true,
        errMsg: "This field is required",
      },

      alpha: {
        value: "",
        errMsg: "Enter valid last name",
      },
    },
    invalid: false,
    touched: false,
    helperText: "",
  },
  mobileNumber: {
    value: "",
    validation: {
      required: {
        value: true,
        errMsg: "This field is required",
      },
      regex: {
        value: /^([0-9]{7,14})$/,
        errMsg: "Mobile Number is 7-14 digits number and no special character",
      },
    },
    invalid: false,
    touched: false,
    helperText: "",
  },
  email: {
    value: "",
    validation: {
      required: {
        value: true,
        errMsg: "This field is required",
      },
      regex: {
        value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        errMsg: "Email format name@domain.com",
      },
    },
    invalid: false,
    touched: false,
    helperText: "",
  },
};

export default addressDetailsInit;
