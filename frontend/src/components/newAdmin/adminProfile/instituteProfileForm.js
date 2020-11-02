const InstituteProfileFormInit = {
  name: {
    value: "",
    validation: {
      required: {
        value: true,
        errMsg: "This field is required",
      },
    },
    invalid: false,
    touched: false,
    helperText: "",
  },
  contactNumber: {
    value: "",
    validation: {
      required: {
        value: true,
        errMsg: "This field is required",
      },
      regex: {
        value: /^([0-9]{10})$/,
        errMsg: "Mobile Number should 10 digit number",
      },
    },
    invalid: false,
    touched: false,
    helperText: "",
  },
  aboutMe: {
    value: "",
    validation: {
      required: {
        value: false,
        errMsg: "",
      },
    },
    invalid: false,
    touched: true,
    helperText: "",
  },
  subject: {
    value: "",
    validation: {
      required: {
        value: false,
        errMsg: "",
      },
    },
    invalid: false,
    touched: true,
    helperText: "",
  },
  board: {
    value: "",
    validation: {
      required: {
        value: false,
        errMsg: "",
      },
    },
    invalid: false,
    touched: true,
    helperText: "",
  },
  location: {
    value: "",
    validation: {
      required: {
        value: false,
        errMsg: "",
      },
    },
    invalid: false,
    touched: true,
    helperText: "",
  },
  website: {
    value: "",
    validation: {
      required: {
        value: false,
        errMsg: "",
      },
    },
    invalid: false,
    touched: true,
    helperText: "",
  },
  instituteProfileImage: {
    value: "",
    preview: "",
    validation: {
      required: {
        value: false,
        errMsg: "",
      },
    },
    invalid: false,
    touched: true,
    helperText: "",
  },
  brochure: {
    value: "",
    validation: {
      required: {
        value: false,
        errMsg: "",
      },
    },
    invalid: false,
    touched: true,
    helperText: "",
  },
};

export default InstituteProfileFormInit;
